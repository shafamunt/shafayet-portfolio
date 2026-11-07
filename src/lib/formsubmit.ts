/**
 * Browser-only FormSubmit delivery via a classic form POST into a hidden
 * iframe. Avoids the AJAX endpoint's CORS / bot-challenge failures that
 * show up on localhost and some hosts.
 */

export type FormSubmitPayload = {
  to: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function deliverViaFormSubmit(
  payload: FormSubmitPayload,
): Promise<{ ok: true } | { ok: false; detail: string }> {
  if (typeof document === "undefined") {
    return Promise.resolve({ ok: false, detail: "FormSubmit requires a browser." });
  }

  return new Promise((resolve) => {
    const frameName = `formsubmit_${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = frameName;
    iframe.title = "FormSubmit";
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.display = "none";

    const form = document.createElement("form");
    form.method = "POST";
    form.action = `https://formsubmit.co/${encodeURIComponent(payload.to)}`;
    form.target = frameName;
    form.style.display = "none";

    const fields: Record<string, string> = {
      name: payload.name,
      email: payload.email,
      _replyto: payload.email,
      _subject: `[Portfolio] ${payload.subject}`,
      _template: "table",
      _captcha: "false",
      // Stay in the iframe instead of navigating the top window.
      _next: "https://formsubmit.co/thank-you",
      message: payload.message,
    };

    for (const [key, value] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    let settled = false;
    const finish = (result: { ok: true } | { ok: false; detail: string }) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(failSafe);
      window.clearTimeout(optimisticOk);
      iframe.removeEventListener("load", onLoad);
      form.remove();
      iframe.remove();
      resolve(result);
    };

    // Cross-origin: we cannot read the iframe body. A load event (or a short
    // delay after submit) is the signal that FormSubmit accepted the POST.
    // X-Frame-Options on their thank-you page can suppress load in some
    // browsers, so we also succeed optimistically shortly after submit.
    const onLoad = () => finish({ ok: true });
    const failSafe = window.setTimeout(
      () => finish({ ok: false, detail: "FormSubmit timed out." }),
      12_000,
    );
    const optimisticOk = window.setTimeout(() => finish({ ok: true }), 2_500);

    iframe.addEventListener("load", onLoad);
    document.body.appendChild(iframe);
    document.body.appendChild(form);

    try {
      form.submit();
    } catch (error) {
      finish({
        ok: false,
        detail: error instanceof Error ? error.message : "FormSubmit submit failed.",
      });
    }
  });
}
