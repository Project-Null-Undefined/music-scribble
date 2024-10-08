/* eslint-disable no-console */
'use client';

import IonIcon from '@reacticons/ionicons';
import styles from './index.module.scss';
import IconButton from '@/components/share/IconButton';
import usePlayer from '@/hooks/usePlayer';

export default function Controller() {
  const { isPlaying, play, pause, nextBar, prevBar, rewind, forward } = usePlayer();

  return (
    <section className={styles.controller}>
      <div className={styles.group}>
        <IconButton icon={<IonIcon name="play-back-outline" size="large" />} onClick={rewind} />
        <IconButton icon={<IonIcon name="play-skip-back-outline" size="large" />} onClick={prevBar} />

        {isPlaying ? (
          <IconButton icon={<IonIcon name="pause-outline" size="large" />} onClick={pause} />
        ) : (
          <IconButton icon={<IonIcon name="play-outline" size="large" />} onClick={play} />
        )}

        <IconButton icon={<IonIcon name="play-skip-forward-outline" size="large" />} onClick={nextBar} />
        <IconButton icon={<IonIcon name="play-forward-outline" size="large" />} onClick={forward} />
      </div>

      <div className={styles.group}>
        <IconButton icon={<IonIcon name="save-outline" size="large" />} onClick={() => console.log('clicked')} />
        <IconButton icon={<IonIcon name="share-outline" size="large" />} onClick={() => console.log('clicked')} />
      </div>
    </section>
  );
}
