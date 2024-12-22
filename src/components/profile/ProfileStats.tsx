import React from 'react';
import { Trophy, Star, Clock } from 'lucide-react';
import type { Character } from '../../types';

interface Props {
  characters: Character[];
}

export function ProfileStats({ characters }: Props) {
  const totalProgress = characters.reduce((sum, char) => sum + char.progress, 0);
  const averageProgress = characters.length ? Math.round(totalProgress / characters.length) : 0;
  const lastPlayed = characters.length
    ? new Date(Math.max(...characters.map(c => new Date(c.last_played).getTime())))
    : null;

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold">Characters</h3>
        </div>
        <p className="text-3xl font-bold">{characters.length}</p>
        <p className="text-purple-200 text-sm mt-1">Total characters created</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Star className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold">Progress</h3>
        </div>
        <p className="text-3xl font-bold">{averageProgress}%</p>
        <p className="text-purple-200 text-sm mt-1">Average completion</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold">Last Played</h3>
        </div>
        <p className="text-3xl font-bold">
          {lastPlayed ? lastPlayed.toLocaleDateString() : 'Never'}
        </p>
        <p className="text-purple-200 text-sm mt-1">Most recent activity</p>
      </div>
    </div>
  );
}