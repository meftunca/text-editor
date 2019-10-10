import _ from "lodash";

export function normalizeHtml(str: string): string {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, " ");
}
export function findLastTextNode(node: Node): Node | null {
  if (node.nodeType === Node.TEXT_NODE) return node;
  let children = node.childNodes;
  for (let i = children.length - 1; i >= 0; i--) {
    let textNode = findLastTextNode(children[i]);
    if (textNode !== null) return textNode;
  }
  return null;
}
export function replaceCaret(el: HTMLElement) {
  // Place the caret at the end of the element
  const target = findLastTextNode(el);
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    let sel = window.getSelection();
    if (sel !== null) {
      let range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (el instanceof HTMLElement) el.focus();
  }
}
export function getSelectionParentElement() {
  let parentEl = null,
    sel;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      parentEl = sel.getRangeAt(0).commonAncestorContainer;
      if (parentEl.nodeType !== 1) {
        parentEl = parentEl.parentNode;
      }
    }
  } else if (sel.type !== "Control") {
    parentEl = sel.createRange().parentElement();
  }
  return parentEl;
}
export function ChangeEditor(type, value) {
  let parentEl = getSelectionParentElement();
  if (parentEl !== null) {
    if (parentEl.className !== "sheet") {
      if (parentEl.dataset[_.camelCase(type)] !== value) {
        parentEl.dataset[_.camelCase(type)] = value;
      } else if (parentEl.dataset[_.camelCase(type)] === value) {
        parentEl.dataset[_.camelCase(type)] = "";
      }
      // parentEl.dataset[_.camelCase(type)] = value;
    } else {
      parentEl.innerHTML =
        "<span class='textControl' data-" + type + "='" + value + "'>" + parentEl.innerText + "</span>";
    }
  }
}
export function ChangeStyle(cssProp, value) {
  let parentEl = getSelectionParentElement();
  if (parentEl !== null) {
    if (parentEl.className !== "sheet") {
      parentEl.style[cssProp] = value;
      // parentEl.dataset[_.camelCase(type)] = value;
    } else {
      parentEl.innerHTML =
        "<span class='textControl' style='" + cssProp + ":" + value + "'>" + parentEl.innerText + "</span>";
    }
  }
}
export const objectToRGB = (value: Object) => "rgba(" + Object.values(value).join(",") + ")";
