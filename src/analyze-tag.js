const tagRegExp = /\{\{([^{}]*?)\}\}/g;

export default function analyzeTag(tpl) {
  let res;
  let str;
  let start = 0;
  let mark = 0;
  let content;
  let tagInfo;
  let tagName;
  let tagArr;
  let tags = [];
  let tagObj = {};
  while (res = tagRegExp.exec(tpl)) {
    start = res.index;
    content = res[0];
    tagInfo = res[1];
    if (mark < start) {
      str = tpl.substring(mark, start);
      str && tags.push({
        type: 'string',
        content: str
      });
    }
    if (tagInfo) {
      tagArr = tagInfo.split(/\s+/);
      tagName = tagArr.shift();
      switch (tagName) {
      case 'if':
        tagObj = {
          type: 'if',
          content: tagArr.join(' ')
        };
        break;
      case 'elseif':
      case 'elif':
        tagObj = {
          type: 'elseif',
          content: tagArr.join(' ')
        };
        break;
      case 'else':
        tagObj = {
          type: 'else'
        };
        break;
      case '/if':
        tagObj = {
          type: 'endif'
        };
        break;
      case 'for':
        tagObj = {
          type: tagName,
          content: tagArr.join(' ')
        };
        break;
      case '/for':
        tagObj = {
          type: 'endfor'
        };
        break;
      case 'js':
        tagObj = {
          type: 'js',
          content: tagArr.join(' ')
        };
        break;
      default:
        tagObj = {
          type: 'var',
          content: tagInfo //{{}}包裹的部分都是变量
        };
      }
      tags.push(tagObj);
    }
    mark = start + content.length;
  }
  if (mark < tpl.length) {
    tags.push({
      type: 'string',
      content: tpl.substring(mark)
    });
  }
  return tags;
}