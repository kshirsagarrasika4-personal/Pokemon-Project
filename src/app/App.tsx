import React from 'react';
import { createUseStyles } from 'react-jss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutProvider } from '../contexts';
import { Nav } from '../components';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { ListPage, Home } from '../screens';
import { PokemonDialog } from '../components/PokemonDialog';

function App() {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <LayoutProvider>
        <div className={classes.root}>
          <BrowserRouter>
            <div className={classes.layout}>
              <Nav />
              <main className={classes.content}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/list" element={<ListPage />} />
                  <Route path="*" element={<ListPage />} />
                </Routes>
              </main>

              <PokemonDialog />
            </div>
          </BrowserRouter>
        </div>
      </LayoutProvider>
    </ApolloProvider>
  );
}

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      inset: 0,
      color: '#111827',
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: '80px 1fr',
      gridTemplateRows: '1fr',
      gap: 16,
      height: '100%',
    },
    content: {
      position: 'relative',
      padding: 24,
      overflow: 'auto',
    },
    '@media (max-width: 1024px)': {
      layout: {
        gridTemplateColumns: '1fr',
      },
    },
  },
  { name: 'App' }
);

export default App;
