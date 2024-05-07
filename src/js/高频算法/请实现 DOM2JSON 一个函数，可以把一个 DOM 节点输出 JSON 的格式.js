/**
 * <div>
 *   <span>
 *     <a></a>
 *   </span>
 *   <span>
 *     <a></a>
 *     <a></a>
 *   </span>
 * </div>
 *
 * 把上面dom结构转成下面的JSON格式
 *
 * {
 *   tag: 'DIV',
 *   children: [
 *     {
 *       tag: 'SPAN',
 *       children: [
 *         { tag: 'A', children: [] }
 *       ]
 *     },
 *     {
 *       tag: 'SPAN',
 *       children: [
 *         { tag: 'A', children: [] },
 *         { tag: 'A', children: [] }
 *       ]
 *     }
 *   ]
 * }
 *
 */

function dom2Json(domtree) {
  let obj = {};
  obj.name = domtree.tagName;
  obj.children = [];
  domtree.childNodes.forEach((child) => obj.children.push(dom2Json(child)));
  return obj;
}