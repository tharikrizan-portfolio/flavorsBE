import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment';

const capitalizedFirstLetter = (str) => {
  str = new String(str)
    .toLowerCase()
    .split(/(\s+)/)
    .filter(function (e) {
      return e.trim().length > 0;
    });
  let strMod = '';

  for (let splittedWord of str) {
    strMod += ' ' + splittedWord.charAt(0).toUpperCase() + splittedWord.slice(1);
    strMod = strMod.trim();
  }
  return strMod;
};

const modifiedDate = (date) => {
  let date_ = date;
  let hours_ = new Date(date_).getHours();
  let mins_ = new Date(date_).getMinutes();
  let secs_ = new Date(date_).getSeconds();

  return new Date(new Date(date_).setHours(hours_, mins_, secs_, 0));
};

const appendDateTime = (date, time) => {
  let date_ = date;
  let hours_ = new Date(time).getHours();
  let mins_ = new Date(time).getMinutes();
  let secs_ = new Date(time).getSeconds();

  return new Date(new Date(date_).setHours(hours_, mins_, secs_, 0));
};

const convertObject = (obj) => JSON.parse(JSON.stringify(obj));

const convertHtmlTextToString = (text) =>
  text.length > 0 ? (convertFromHTML(text).contentBlocks?.[0].text || '') : '';

export let convertDraftTrailWithGivenText = (htmlValue, text) => {
  let cState = EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML(htmlValue).contentBlocks,
      convertFromHTML(htmlValue).entityMap,
    ),
  );
  let contentRaw = convertToRaw(cState.getCurrentContent());
  contentRaw.blocks[0].text = text;
  let newHtmlValue = draftToHtml(contentRaw);

  return newHtmlValue;
};

const sortDataRows = (rows, type, isAscOrder, name) => {
  if (isAscOrder) {
    rows.sort((a, b) => {
      if (type === 'boolean') {
        return a[name] ? -1 : 1;
      }
      if (type === 'date') {
        return moment(b[name]).isAfter(moment(a[name])) ? -1 : 1;
      }
      if (type === 'html') {
        const nameA = convertHtmlTextToString(a[name].toUpperCase()); // ignore upper and lowercase
        const nameB = convertHtmlTextToString(b[name].toUpperCase()); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      }
      if (type === 'string') {
        const nameA = a[name].toUpperCase(); // ignore upper and lowercase
        const nameB = b[name].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      }
    });
  } else {
    rows.sort((a, b) => {
      if (type === 'boolean') {
        return a[name] ? 1 : -1;
      }
      if (type === 'endAt') {
        return moment(b[name]).isAfter(moment(a[name])) ? 1 : -1;
      }
      if (type === 'startAt') {
        return moment(b[name]).isAfter(moment(a[name])) ? 1 : -1;
      }
      if (type === 'html') {
        const nameA = a[name].toLowerCase(); // ignore upper and lowercase
        const nameB = b[name].toLowerCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
      }
      if (type === 'string') {
        const nameA = convertHtmlTextToString(a[name].toLowerCase()); // ignore upper and lowercase
        const nameB = convertHtmlTextToString(b[name].toLowerCase()); // ignore upper and lowercase
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
      }
    });
  }
};
export const convertHTMLTagToInnerText = (htmlValue) => {
  let cState = EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML(htmlValue).contentBlocks,
      convertFromHTML(htmlValue).entityMap,
    ),
  );
  let contentRaw = convertToRaw(cState.getCurrentContent());
  return contentRaw.blocks[0].text;
};

export const range = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);

export default {
  capitalizedFirstLetter,
  modifiedDate,
  appendDateTime,
  convertObject,
  convertHtmlTextToString,
  sortDataRows,
  convertHTMLTagToInnerText,
};
