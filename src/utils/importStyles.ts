import fs from "fs";
import sass from "node-sass";

interface IGenerateStyleProp {
  filePaths: string[];
  includePaths: string[];
}

export const generateStyle = async (props: IGenerateStyleProp) => {
  const { filePaths, includePaths } = props;
  let css = "";
  for (const filePath of filePaths) {
    const cssText = await new Promise<string>((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data.toString());
      });
    });
    const processedSassObject = await new Promise<sass.Result>((resolve, reject) => {
      sass.render(
        {
          data: cssText,
          includePaths: [...includePaths],
        },
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        },
      );
    });
    const processedCss = processedSassObject.css.toString();
    css += `\n${processedCss}`;
  }

  const head = document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = css;
  head.appendChild(style);
};

export const removeStyle = () => {
  const styleElem = document.getElementsByTagName("style")[0];
  styleElem.parentNode!.removeChild(styleElem);
};
