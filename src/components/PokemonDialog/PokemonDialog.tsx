import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPokemon } from '../../hooks/useGetPokemon';

export const PokemonDialog: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const name = params.get('pokemon') || undefined;

  const { data, loading } = useGetPokemon({ name });

  const open = Boolean(name);
  const close = () => {
    const next = new URLSearchParams(params);
    next.delete('pokemon');
    navigate({ search: `?${next.toString()}` });
  };

  const p = data?.pokemon;

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle className={classes.title}>
        {p?.name || 'Pokémon'}
        <IconButton aria-label="close" onClick={close} className={classes.close} style={{marginLeft:'85%'}}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        {loading && <div>Loading…</div>}
        {!loading && p && (
          <div className={classes.row}>
            <img src={p.image} alt={p.name} className={classes.hero} />
            <div className={classes.col}>
              
              <div className={classes.kv}><span>Number</span><strong>#{p.number}</strong></div>
              <div className={classes.kv}><span>Classification</span><strong>{p.classification}</strong></div>
              <div className={classes.kv}><span>Height</span><strong>{p.height.minimum} – {p.height.maximum}</strong></div>
              <div className={classes.kv}><span>Weight</span><strong>{p.weight.minimum} – {p.weight.maximum}</strong></div>
              <div className={classes.kv}><span>Types</span><strong>{p.types.join(', ')}</strong></div>
              <div className={classes.kv}><span>Resistant</span><strong>{p.resistant.join(', ')}</strong></div>
              <div className={classes.kv}><span>Weaknesses</span><strong>{p.weaknesses.join(', ')}</strong></div>
              <div className={classes.kv}><span>Max HP</span><strong>{p.maxHP}</strong></div>
              <div className={classes.kv}><span>Max CP</span><strong>{p.maxCP}</strong></div>
              <div className={classes.kv}><span>Flee Rate</span><strong>{Math.round(p.fleeRate * 100)}%</strong></div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const useStyles = createUseStyles(
  {
    title: {
      position: 'relative',
      fontWeight: 700,
      color: '#111827', 
    },
    close: {
      position: 'absolute',
      right: 8,
      top: 8,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      color: '#111827',   
    },
    row: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
    },
    col: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      flex: 1,
    },
    hero: {
      width: 128,
      height: 128,
      objectFit: 'contain',
    },
    kv: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      borderBottom: '1px dashed #e5e7eb',
      paddingBottom: 6,
      '& span': { color: '#6b7280' },  
      '& strong': { color: '#111827' },   
    },
  },
  { name: 'PokemonDialog' }
);
