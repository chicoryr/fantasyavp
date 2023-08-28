"use client";
import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, arrayUnion, getDocs } from "firebase/firestore"; 
import { auth, db } from '../../firebase/config';
import { useRouter } from 'next/navigation'

interface Team {
  Player1: string;
  Player2: string;
  Player1Rating: number;
  Player2Rating: number;
}


const TeamAdder: React.FC = () => {
  const [team, setTeam] = useState<Team>({
    Player1: '',
    Player2: '',
    Player1Rating: 0,
    Player2Rating: 0,
  });
  const [tournaments, setTournaments] = useState<string[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
  auth.onAuthStateChanged(function(user) {
    if (user) {
    } else {
      router.push('/');
    }
  });
  
  async function fetchTournaments() {
    try {
        const querySnapshot = await getDocs(collection(db, 'Tournaments'));
        const tournamentNames = querySnapshot.docs.map(doc => doc.id);
        setTournaments(tournamentNames);
        if (tournamentNames.length) setSelectedTournament(tournamentNames[0]); // Default to the first tournament if available
      } catch (error) {
        console.error("Error fetching tournaments: ", error);
      }
    }
    fetchTournaments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTournament) {
      alert('Please select a tournament.');
      return;
    }

    try {
      // 1. Add team to Firestore with auto-generated ID
      const teamsCollection = collection(db, selectedTournament);
      const teamDocRef = await addDoc(teamsCollection, team);

      // 2. Update the selected document in the Tournaments collection with the new ID
      const tournamentDoc = doc(db, 'Tournaments', selectedTournament);
      await updateDoc(tournamentDoc, {
        Team_ID: arrayUnion(teamDocRef.id)
      });

      // Optional: reset the form after submission
      setTeam({
        Player1: '',
        Player2: '',
        Player1Rating: 0,
        Player2Rating: 0,
      });

      alert('Team added successfully to both collections!');
    } catch (error) {
      console.error("Error: ", error);
      alert('Error processing request. Please try again.');
    }
  };
  if(!auth.currentUser){
    return (<></>)
  }
  return (
    <form onSubmit={handleSubmit}>
      <select 
        value={selectedTournament} 
        onChange={(e) => setSelectedTournament(e.target.value)}
      >
        {tournaments.map(tournament => (
          <option key={tournament} value={tournament}>
            {tournament}
          </option>
        ))}
      </select>
      <input 
        value={team.Player1}
        onChange={(e) => setTeam(prev => ({ ...prev, Player1: e.target.value }))}
        placeholder="Player 1"
        required
      />
      <input 
        value={team.Player2}
        onChange={(e) => setTeam(prev => ({ ...prev, Player2: e.target.value }))}
        placeholder="Player 2"
        required
      />
      <input 
        type="number"
        value={team.Player1Rating}
        onChange={(e) => setTeam(prev => ({ ...prev, Player1Rating: Number(e.target.value) }))}
        placeholder="Player 1 Rating"
        required
      />
      <input 
        type="number"
        value={team.Player2Rating}
        onChange={(e) => setTeam(prev => ({ ...prev, Player2Rating: Number(e.target.value) }))}
        placeholder="Player 2 Rating"
        required
      />
      <button type="submit">Add Team</button>
    </form>
  );
}

export default TeamAdder;

