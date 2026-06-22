function replaceEmojis() {
  const replacements = [
    { emoji: "✅", className: "custom-checked-checkbox" },
  ];

  replacements.forEach(({ emoji, className }) => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          return node.nodeValue.includes(emoji)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        },
      }
    );

    const nodesToReplace = [];

    while (walker.nextNode()) {
      nodesToReplace.push(walker.currentNode);
    }

    nodesToReplace.forEach((textNode) => {
      const parts = textNode.nodeValue.split(emoji);
      const parent = textNode.parentNode;

      parts.forEach((part, index) => {
        if (index > 0) {
          const customElement = document.createElement("i");
          customElement.className = className;
          parent.insertBefore(customElement, textNode);
        }
        if (part) {
          parent.insertBefore(document.createTextNode(part), textNode);
        }
      });

      parent.removeChild(textNode);
    });
  });
}

replaceEmojis();
