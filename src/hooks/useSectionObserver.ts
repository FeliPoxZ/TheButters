import { useEffect } from "react";

export function useSectionObserver(
    sectionIds: string[],
    onChange: (id: string) => void,
    paused: boolean 
) {
    useEffect(() => {
        if (paused) return;

        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        if (sections.length === 0) return;

        const visibilityMap = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    visibilityMap.set(entry.target.id, entry.intersectionRatio);
                });

                const scrollY = window.scrollY;

                let result = sectionIds[0];

                if (scrollY < 10) {
                    let maxRatio = 0;

                    visibilityMap.forEach((ratio, id) => {
                        if (ratio > maxRatio) {
                            maxRatio = ratio;
                            result = id;
                        }
                    });
                } else {
                    for (const id of sectionIds) {
                        const ratio = visibilityMap.get(id) || 0;
                        if (ratio >= 0.3) {
                            result = id;
                        }
                    }
                }

                onChange(result);
            },
            {
                threshold: buildThresholdList(),
            }
        );

        sections.forEach((sec) => observer.observe(sec));
        return () => observer.disconnect();
    }, [sectionIds, onChange, paused]);
}

function buildThresholdList() {
    const thresholds = [];
    for (let i = 0; i <= 1; i += 0.01) thresholds.push(i);
    return thresholds;
}
