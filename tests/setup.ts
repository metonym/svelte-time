if (
  typeof window !== "undefined" &&
  !("innerText" in HTMLElement.prototype)
) {
  Object.defineProperty(HTMLElement.prototype, "innerText", {
    configurable: true,
    enumerable: true,
    get() {
      return this.textContent ?? "";
    },
    set(value) {
      this.textContent = value;
    },
  });
}
