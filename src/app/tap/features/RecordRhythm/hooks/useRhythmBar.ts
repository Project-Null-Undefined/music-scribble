import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { highlightedSectionsAtom } from '@/stores/tap';

export function useRhythmBar(duration: number) {
  const [pushSpaceKey, setPushSpaceKey] = useState(false);
  const [progress, setProgress] = useState(0);
  const [highlightedSections, setHighlightedSections] = useAtom(highlightedSectionsAtom);
  const [currentHighlightStart, setCurrentHighlightStart] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false); // 進行状況の開始フラグ
  const [isFinished, setIsFinished] = useState(false); // 進行状況の開始フラグ

  const handleKeyDownSpace = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        setPushSpaceKey(true);
        setIsStarted(true);
      }
    },
    [setPushSpaceKey, isStarted],
  );

  const handleKeyUpSpace = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        setPushSpaceKey(false);
      }
    },
    [setPushSpaceKey],
  );

  // useEffectでキーボードイベントを監視
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownSpace);
    window.addEventListener('keyup', handleKeyUpSpace);

    // クリーンアップ関数でイベントリスナーを削除
    return () => {
      window.removeEventListener('keydown', handleKeyDownSpace);
      window.removeEventListener('keyup', handleKeyUpSpace);
    };
  }, [handleKeyDownSpace, handleKeyUpSpace]);

  useEffect(() => {
    if (!isStarted) return; // 進行状況が始まっていない場合は何もしない

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (duration * 10);
        const newProgress = parseFloat((prev + increment).toFixed(2));
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isStarted, duration]);

  useEffect(() => {
    if (pushSpaceKey) {
      if (currentHighlightStart === null && progress < 100) {
        setCurrentHighlightStart(progress);
      }
    } else {
      if (currentHighlightStart !== null) {
        setHighlightedSections((prev) => [...prev, { start: currentHighlightStart, end: progress }]);
        setCurrentHighlightStart(null);
      }
    }

    if (progress >= 100) {
      setIsFinished(true);
    }
  }, [progress, pushSpaceKey]);

  const reset = useCallback(() => {
    setProgress(0); // 進行状況のリセット
    setHighlightedSections([]); // ハイライトセクションのリセット
    setIsStarted(false); // 開始状態のリセット
    setIsFinished(false); // 終了状態のリセット
    setCurrentHighlightStart(null); // ハイライト開始位置のリセット
  }, [setProgress, setHighlightedSections, setIsStarted, setIsFinished, setCurrentHighlightStart]);

  return { pushSpaceKey, progress, highlightedSections, currentHighlightStart, isStarted, isFinished, reset };
}
