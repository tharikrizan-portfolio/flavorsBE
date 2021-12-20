import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";

const inlineToolbarPluginTitle = createInlineToolbarPlugin();

const sideToolbarPluginTitle = createSideToolbarPlugin();

const plugins = [inlineToolbarPluginTitle, sideToolbarPluginTitle];

export default plugins;