import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getCharacterById } from 'src/api/characters';
import type { Character } from 'src/api/characters';

import styles from './character-details.module.css';

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Character not found.');
      setIsLoading(false);
      return;
    }

    const fetchCharacter = async () => {
      try {
        setIsLoading(true);
        const data = await getCharacterById(id);

        if (!data) {
          setError('Character not found.');
          return;
        }

        setCharacter(data);
      } catch {
        setError('Unable to load character details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  return (
    <section className={styles.container}>
      <Link to="/characters" className={styles.backLink}>
        ← Back to characters
      </Link>

      {isLoading && <p className={styles.state}>Loading character...</p>}

      {error && !isLoading && <p className={styles.state}>{error}</p>}

      {!isLoading && !error && character && (
        <div className={styles.content}>
          {character.image ? (
            <img src={character.image} alt={character.name} className={styles.image} />
          ) : (
            <div className={styles.placeholder} aria-hidden>
              No image
            </div>
          )}

          <div className={styles.details}>
            <h1 className={styles.name}>{character.name}</h1>

            <p className={styles.houseLabel}>House</p>
            <p className={styles.houseValue}>{character.house || 'Unknown'}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export { CharacterDetails };

