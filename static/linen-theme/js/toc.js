document.addEventListener("DOMContentLoaded", () => {
  const headers = [...document.querySelectorAll("h2, h3")];
  const toc = [];
  let lastH2 = null;
  let previousToc = [];
  let previousH2Id = null;
  let previousH3Id = null;

  headers.forEach((header) => {
    const title = header.textContent.trim();
    const id = header.id || title.replace(/\s+/g, "-").toLowerCase();

    if (header.tagName === "H2") {
      lastH2 = {
        title,
        id,
        active: false,
        children: [],
        visible: false,
        passiveVisible: false,
      };
      toc.push(lastH2);
    } else if (header.tagName === "H3" && lastH2) {
      lastH2.children.push({
        title,
        id,
        active: false,
        visible: false,
      });
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const isVisible = !!entry.intersectionRatio;
        const isH2 = toc.findIndex((h2) => h2.id === id) !== -1;
        toc.forEach((h2) => {
          if (h2.id === id) {
            h2.visible = isVisible;
            if (isVisible) {
              previousH2Id = h2.id;
            }
          }
          h2.children.forEach((h3) => {
            if (h3.id === id) {
              h3.visible = isVisible;
              if (isVisible) {
                previousH3Id = h3.id;
              }
            }
          });
        });
        toc.forEach((item) => {
          item.passiveVisible =
            (item.children || []).findIndex((h3) => h3.visible) !== -1;
          if (item.passiveVisible) {
            previousH2Id = item.id;
          }
        });
      });
      const activeH2Index = toc.findIndex(
        (tocItem) => tocItem.passiveVisible || tocItem.visible,
      );
      toc.forEach((h2, h2Index) => {
        h2.active = h2Index === activeH2Index;
        if (h2Index === activeH2Index) {
          const activeH3Index = (h2.children || []).findIndex(
            (h3) => h3.visible,
          );
          h2.children.forEach((h3, h3Index) => {
            h3.active = h3Index === activeH3Index;
          });
        } else {
          h2.children.forEach((h3) => {
            h3.active = false;
          });
        }
      });

      const activeH2 = toc.find((item) =>
        typeof anchoringId !== undefined && anchoringId
          ? item.id === anchoringId
          : item.active,
      );
      if (activeH2) {
        if (isEqual(toc, previousToc) && !anchoringId) {
          return;
        } else {
          previousToc = cloneDeep(toc);
        }
        if (activeH2?.children?.every((h3) => !h3?.active)) {
          previousH3Id = null;
        }
        const tocItems =
          document.getElementById("toc")?.children[1]?.children || [];
        Array.prototype.forEach.call(tocItems, (tocItem) => {
          if (tocItem.children[0].dataset.id === activeH2.id) {
            tocItem.className = "toc-item-wrap active";
            tocItem.scrollIntoView({
              block: "nearest",
              inline: "nearest",
            });
          } else {
            tocItem.className = "toc-item-wrap";
          }
          const subItems = tocItem.children[1];
          const activeH3 = (activeH2.children || []).find(
            (item) => item.active,
          );
          if (subItems) {
            Array.prototype.forEach.call(
              subItems?.children || [],
              (subItem) => {
                if (subItem.children[0].dataset.id === activeH3?.id) {
                  subItem.children[0].className = "toc-sub-item-link active";
                  subItem.children[0].scrollIntoView({
                    block: "nearest",
                    inline: "nearest",
                  });
                } else {
                  subItem.children[0].className = "toc-sub-item-link";
                }
              },
            );
          }
        });
        if (anchoringId) {
          anchoringId = null;
        }
      } else {
        const isScrollingUp = window.scrollY < previousScrollY;
        if (isScrollingUp) {
          const previousH2 = toc.find((h2) => h2.id === previousH2Id);
          const previousH2Index = toc.findIndex((h2) => h2.id === previousH2Id);
          const previousH3ParentIndex = toc.findIndex((h2) =>
            h2?.children?.find((h3) => h3.id === previousH3Id),
          );
          const newToc = cloneDeep(toc);
          let targetH2Index = 0;
          if (!previousH3Id || previousH3ParentIndex > previousH2Index) {
            targetH2Index = previousH2Index - 1;
          } else {
            targetH2Index = previousH3ParentIndex;
          }
          newToc.forEach((h2, index) => {
            h2.active = index === targetH2Index;
          });
          const newActiveH2 = newToc.find((item) => item.active);
          if (!newActiveH2) {
            return;
          }
          const tocItems =
            document.getElementById("toc")?.children[1]?.children || [];
          Array.prototype.forEach.call(tocItems, (tocItem) => {
            if (tocItem.children[0].dataset.id === newActiveH2.id) {
              tocItem.className = "toc-item-wrap active";
              tocItem.scrollIntoView({
                block: "nearest",
                inline: "nearest",
              });
            } else {
              tocItem.className = "toc-item-wrap";
            }
            const subItems = tocItem.children[1];
            let activeH3Index = newActiveH2?.children?.length - 1;
            if (newActiveH2?.children?.find((h3) => h3.id === previousH3Id)) {
              const previousH3Index = newActiveH2?.children?.findIndex(
                (h3) => h3.id === previousH3Id,
              );
              activeH3Index =
                previousH3Index - 1 > -1 ? previousH3Index - 1 : 0;
            }
            const activeH3Id = newActiveH2?.children?.[activeH3Index]?.id;
            if (subItems) {
              Array.prototype.forEach.call(
                subItems?.children || [],
                (subItem) => {
                  if (subItem.children[0].dataset.id === activeH3Id) {
                    subItem.children[0].className = "toc-sub-item-link active";
                    subItem.children[0].scrollIntoView({
                      block: "nearest",
                      inline: "nearest",
                    });
                  } else {
                    subItem.children[0].className = "toc-sub-item-link";
                  }
                },
              );
            }
          });
        } else {
          const tocItems =
            document.getElementById("toc")?.children[1]?.children || [];
          Array.prototype.forEach.call(tocItems, (tocItem) => {
            if (tocItem.children[0].dataset.id === previousH2Id) {
              tocItem.className = "toc-item-wrap active";
              tocItem.scrollIntoView({
                block: "nearest",
                inline: "nearest",
              });
            } else {
              tocItem.className = "toc-item-wrap";
            }
            const subItems = tocItem.children[1];
            if (subItems) {
              Array.prototype.forEach.call(
                subItems?.children || [],
                (subItem) => {
                  if (subItem.children[0].dataset.id === previousH3Id) {
                    subItem.children[0].className = "toc-sub-item-link active";
                    subItem.children[0].scrollIntoView({
                      block: "nearest",
                      inline: "nearest",
                    });
                  } else {
                    subItem.children[0].className = "toc-sub-item-link";
                  }
                },
              );
            }
          });
        }
      }
    },
    {
      rootMargin: "0px",
      threshold: [0, 1],
    },
  );
  headers.forEach((header) => observer.observe(header));
});
