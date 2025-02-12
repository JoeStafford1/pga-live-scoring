import { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Button } from "@mui/material";

export default function PGALiveScores() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    // Simulated API call - Replace with actual API integration
    const fetchScores = async () => {
      const response = await fetch("https://api.sportsdata.io/golf/v2/json/Leaderboard/2024"); // Replace with a working API
      const data = await response.json();
      setPlayers(data.Players);
    };

    fetchScores();
    const interval = setInterval(fetchScores, 60000); // Auto-refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PGA Tour Live Scores</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
              {players.map((player, index) => (
                <Button key={index} variant="outlined" onClick={() => setSelectedPlayer(player)}>
                  {player.Name} - {player.TotalScore}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
        <div>
          {selectedPlayer && (
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold mb-2">{selectedPlayer.Name} - {selectedPlayer.TotalScore}</h2>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Round</TableCell>
                      {[...Array(18)].map((_, i) => <TableCell key={i}>{i + 1}</TableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedPlayer.Rounds.map((round, roundIndex) => (
                      <TableRow key={roundIndex}>
                        <TableCell>Round {roundIndex + 1}</TableCell>
                        {round.Holes.map((hole, holeIndex) => (
                          <TableCell key={holeIndex}>{hole.Strokes}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
