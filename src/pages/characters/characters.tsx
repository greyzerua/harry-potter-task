import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getCharacters } from 'src/api/characters';
import type { Character } from 'src/api/characters';

import styles from './characters.module.css';

const ITEMS_PER_PAGE = 13;

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        const data = await getCharacters();
        setCharacters(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error occurred while loading characters.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const hasCharacters = !isLoading && !error && characters.length > 0;
  const visibleCharacters = characters.slice(0, visibleCount);
  const hasMore = visibleCharacters.length < characters.length;

  const loadMoreCharacters = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, characters.length));
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Characters</h1>

      {isLoading && <p className={styles.state}>Loading characters...</p>}

      {error && !isLoading && <p className={styles.state}>Failed to load characters. {error}</p>}

      {hasCharacters && (
        <InfiniteScroll
          dataLength={visibleCharacters.length}
          next={loadMoreCharacters}
          hasMore={hasMore}
          loader={<div className={styles.loader} />}
          scrollThreshold={0.9}
          style={{ overflow: 'visible' }}
        >
          <div className={styles.grid}>
            {visibleCharacters.map((character) => (
              <Link
                to={`/characters/${character.id}`}
                key={character.id}
                className={styles.card}
              >
                {character.image ? (
                  <img src={character.image} alt={character.name} className={styles.image} loading="lazy" />
                ) : (
                  <div className={styles.placeholder} aria-hidden>
                    No image
                  </div>
                )}
                <div className={styles.info}>
                  <h2 className={styles.name}>{character.name}</h2>
                  <p className={styles.house}>{character.house || 'Unknown house'}</p>
                </div>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </section>
  );
};

export { Characters };

