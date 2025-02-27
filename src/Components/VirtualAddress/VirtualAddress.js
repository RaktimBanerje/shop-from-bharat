import React, { useEffect, useState } from "react";
import styles from "./VirtualAddress.module.css";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

const VirtualAddress = () => {
  const [copied, setCopiedId] = useState();
  const [copiedText, setCopiedText] = useState();
  const [copiedImage, setCopiedImage] = useState();
  const [text, setText] = useState(`Your Virtual Address is...`);

  useEffect(() => {
    (async function run() {
      if (copied?.includes("text")) {
        // Reading text with readText

        const text = await navigator.clipboard.readText();
        setCopiedText(text);
      } else if (copied?.includes("image")) {
        // Reading image data with read

        const clipboard = await navigator.clipboard.read();

        const images = await Promise.all(
          clipboard
            .filter((clipboardItem) =>
              clipboardItem.types.includes("image/png")
            )
            .map((clipboardItem) => clipboardItem.getType("image/png"))
        );

        // UI supports one image, so only set one

        setCopiedImage(URL.createObjectURL(images[0]));
      }
    })();
    setTimeout(() => {
      setCopiedId(undefined);
      setCopiedText(undefined);
    }, 3000);
  }, [copied]);

  return (
    <div className={styles.main_clipboard}>
      <div className={styles.clipboard_container}>
        <div className={styles.clipboard}>
          <button
            className={styles.clipboard_btn}
            onClick={async () => {
              // Writing text with writeText and a fallback using copy-to-clipboard

              if ("clipboard" in navigator) {
                await navigator.clipboard.writeText(text);
                toast.success("Virtual Address Successfully Copied!!");
              } else {
                copy("await no address...");
                toast.success("Sorry, Please try again!!");
              }

              setCopiedId("write-text");
            }}
          >
            {copied === "write-text" ? "✅ Copied" : "Copy"}
          </button>
          <pre>
            <code>{text}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default VirtualAddress;
