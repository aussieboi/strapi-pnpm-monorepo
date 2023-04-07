
export interface UseWordWidth {
  content: string | string[],
  itemClasses?: string[],
  wrapperClasses?: string[],
}

export const useWordWidth = (config: UseWordWidth): number => {
  let { content, itemClasses, wrapperClasses } = config
  let textItem = [];
  let div = document.createElement('div');
  wrapperClasses?.forEach(wc => div.classList.add(wc))

  function textIsString(text: string | string[]): text is string {
    return typeof text === "string"
  }
  if (!textIsString(content)) {
    content.forEach((item) => textItem.push(item))
  } else {
    textItem.push(content)
  }
  textItem.forEach(item => {
    let span = document.createElement('span');
    itemClasses?.forEach(ic => ic && span.classList.add(ic))
    span.innerHTML = item
    div.appendChild(span)
  })
  document.body.appendChild(div);
  let width = div.offsetWidth
  div.parentNode!.removeChild(div);
  return width;
};
