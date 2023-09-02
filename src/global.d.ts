/* module.css 인식 오류 해결 */
declare module "*.css" {
    const content: { [className: string]: string };
    export = content;
}