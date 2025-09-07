import React, { useMemo, useState, ChangeEvent } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPokemons, Pokemon } from '../../hooks/useGetPokemons';

export const PokemonList: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pokemons, loading } = useGetPokemons(151);
  const [query, setQuery] = useState<string>('');

  const filtered: Pokemon[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pokemons;
    return pokemons.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().includes(q) ||
        pokemon.number.toLowerCase().includes(q) ||
        pokemon.types.join(' ').toLowerCase().includes(q)
      );
    });
  }, [pokemons, query]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const openDetails = (name: string) => {
    const next = new URLSearchParams(searchParams);
    next.set('pokemon', name);
    navigate({ search: `?${next.toString()}` });
  };

  return (
    <div className={classes.root}>
      <input
        className={classes.search}
        placeholder="Search Pokémon by name, number or type"
        value={query}
        onChange={onChange}
        aria-label="Search Pokémon"
      />
      {loading && <div className={classes.loading}>Loading…</div>}
      <div className={classes.grid}>
        {filtered.map((pkmn) => (
          <button
            key={pkmn.id}
            className={classes.card}
            onClick={() => openDetails(pkmn.name)}
            title={`Open ${pkmn.name} details`}
          >
            <img className={classes.avatar} src={pkmn.image} alt={pkmn.name} loading="lazy" />
            <div className={classes.meta}>
              <div className={classes.title}>
                <span className={classes.number}>#{pkmn.number}</span>
                <span className={classes.name}>{pkmn.name}</span>
              </div>
              <div className={classes.types}>
                {pkmn.types.map((t) => (
                  <span key={t} className={classes.typeBadge}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
      {(!loading && filtered.length === 0) && (
        <div className={classes.empty}>No Pokémon found.</div>
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    },
    search: {
      color: '#111827',
      width: '100%',
      fontSize: 16,
      padding: [12, 16],
      borderRadius: 12,
      border: '1px solid #e5e7eb',
      outline: 'none',
      '&:focus': {
        borderColor: '#9ca3af',
        boxShadow: '0 0 0 3px rgba(59,130,246,0.2)',
      },
    },
    loading: {
      padding: 16,
      fontWeight: 500,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 16,
    },
    card: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 12,
      width: '100%',
      textAlign: 'left',
      // background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: 16,
      cursor: 'pointer',
      transition: 'transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        borderColor: '#d1d5db',
      },
    },
    avatar: {
      width: 64,
      height: 64,
      objectFit: 'contain',
    },
    meta: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minWidth: 0,
    },
    title: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginBottom: 6,
    },
    number: {
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: 12,
      color: '#6b7280',
    },
    name: {
      fontSize: 18,
      fontWeight: 600,
      color: '#111827',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    types: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
    },
    typeBadge: {
      fontSize: 12,
      padding: [4, 8],
      borderRadius: 9999,
      background: '#f3f4f6',
      border: '1px solid #e5e7eb',
      color:'#6b7280'
    },
    empty: {
      textAlign: 'center',
      color: '#6b7280',
      padding: 24,
    },
  },
  { name: 'PokemonList' }
);
