export type CopyResult = 'clipboard' | 'fallback' | 'failed';

export async function copyText(text: string): Promise<CopyResult> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return 'clipboard';
    } catch {
      // Continue to the browser-compatible textarea fallback.
    }
  }

  const previouslyFocused = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.readOnly = true;
  textarea.setAttribute('aria-hidden', 'true');
  textarea.style.position = 'fixed';
  textarea.style.inset = '-9999px auto auto -9999px';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const copied = document.execCommand('copy');
    return copied ? 'fallback' : 'failed';
  } catch {
    return 'failed';
  } finally {
    textarea.remove();
    previouslyFocused?.focus();
  }
}
