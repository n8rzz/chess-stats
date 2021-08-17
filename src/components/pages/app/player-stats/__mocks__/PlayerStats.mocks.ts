import React from 'react';
import { PlayerStats } from '../PlayerStats';

export const playerStatsPropsMock: React.ComponentProps<typeof PlayerStats> = {
  isLoading: false,
  label: 'Rapid',
  highLow: {
    highest: {
      rating: 1424,
      date: 1628992196,
    },
    lowest: {
      rating: 484,
      date: 1367362734,
    },
  },
  stats: {
    last: {
      rating: 793,
      date: 1629136081,
      rd: 31,
    },
    best: {
      rating: 1293,
      date: 1367780882,
      game: 'https://www.chess.com/game/live/508525278',
    },
    record: {
      win: 244,
      loss: 244,
      draw: 31,
    },
  },
};
