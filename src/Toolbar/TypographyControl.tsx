import React from "react";
/**
 * !Props
 * role => events type in triggered css manipulation
 * icon => event icon
 * name => triggered css attribute
 */

const Typography = [
  /*   {
            role: "editor",
            icon: <Icon></Icon>,
            name: ""
        } 
  */
];

let typeArray: Array<Array<string>> = [
  ["font-weight", "format_bold", "bold"],
  ["font-style", "format_italic", "italic"],
  ["seperator"],
  ["text-decoration", "format_underline", "underline"],
  ["text-decoration", "maximize", "overline"],
  ["text-decoration", "drag_handle", "underline-overline"],
  ["text-decoration", "strikethrough_s", "line-through"],
  ["seperator"],
  ["text-align", "format_align_left", "left"],
  ["text-align", "format_align_right", "right"],
  ["text-align", "format_align_center", "center"],
  ["text-align", "format_align_justify", "justify"]
];
typeArray.map(i => {
  if (i[0] === "seperator") {
    Typography.push({ role: "seperator" });
  } else {
    Typography.push({
      role: "editor",
      icon: i[1],
      name: i[0],
      value: i[2]
    });
  }
});
const fontSize: Array<string> = [
  "headline1",
  "headline2",
  "headline3",
  "headline4",
  "headline5",
  "headline6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "caption",
  "button",
  "overline"
];

export { Typography, fontSize };
