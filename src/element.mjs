/*
    A HTML Compatible Element that supports serverside Rendered Elements via shiming
*/
export const stealifyElement = typeof HTMLElement !== 'undefined' ? HTMLElement : class HTMLElement { };