import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography
} from '@mui/material';
import {
  EmojiEvents,
  LocalFireDepartment,
  GpsFixed,
  WorkspacePremium,
  Star
} from '@mui/icons-material';

const AchievementsGrid = ({ stats, user }) => {
  // Achievement component for reuse
  const Achievement = ({ unlocked, icon: Icon, title, description, progress }) => (
    <Card sx={{ bgcolor: unlocked ? 'secondary.main' : 'background.default', opacity: unlocked ? 1 : 0.5 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Icon sx={{ fontSize: 32, color: unlocked ? 'text.primary' : 'text.secondary' }} />
          <Box>
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: '0.875rem', color: 'text.primary' }}>
              {title}
            </Typography>
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
              {description}
            </Typography>
          </Box>
        </Box>
        {!unlocked && progress && (
          <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.primary', opacity: 0.6 }}>
            {progress}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <WorkspacePremium sx={{ fontSize: 24, color: 'text.primary' }} />
          <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem', color: 'text.primary' }}>
            ACHIEVEMENTS
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Achievement unlocked={stats.totalHabits >= 1} icon={Star} title="FIRST STEPS" description="Create your first habit" />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Achievement unlocked={user.level >= 5} icon={EmojiEvents} title="RISING HERO" description="Reach level 5" progress={user.level < 5 ? `Level ${user.level} / 5` : undefined} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Achievement unlocked={user.level >= 10} icon={EmojiEvents} title="VETERAN" description="Reach level 10" progress={user.level < 10 ? `Level ${user.level} / 10` : undefined} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Achievement unlocked={stats.longestStreak >= 7} icon={LocalFireDepartment} title="WEEK WARRIOR" description="7-day streak" progress={stats.longestStreak < 7 ? `${stats.longestStreak} / 7 days` : undefined} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Achievement unlocked={stats.longestStreak >= 30} icon={LocalFireDepartment} title="MONTH MASTER" description="30-day streak" progress={stats.longestStreak < 30 ? `${stats.longestStreak} / 30 days` : undefined} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Achievement unlocked={stats.longestStreak >= 100} icon={LocalFireDepartment} title="CENTURION" description="100-day streak" progress={stats.longestStreak < 100 ? `${stats.longestStreak} / 100 days` : undefined} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Achievement unlocked={stats.totalCompletions >= 10} icon={GpsFixed} title="GETTING STARTED" description="10 completions" progress={stats.totalCompletions < 10 ? `${stats.totalCompletions} / 10` : undefined} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Achievement unlocked={stats.totalCompletions >= 50} icon={GpsFixed} title="DEDICATED" description="50 completions" progress={stats.totalCompletions < 50 ? `${stats.totalCompletions} / 50` : undefined} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Achievement unlocked={stats.totalCompletions >= 100} icon={GpsFixed} title="COMMITTED" description="100 completions" progress={stats.totalCompletions < 100 ? `${stats.totalCompletions} / 100` : undefined} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Achievement unlocked={stats.completionRate >= 100} icon={Star} title="PERFECTIONIST" description="100% avg rate (30d)" progress={stats.completionRate < 100 ? `${Math.round(stats.completionRate)}% / 100%` : undefined} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Achievement
              unlocked={stats.categoryBreakdown.Body > 0 && stats.categoryBreakdown.Mind > 0 && stats.categoryBreakdown.Spirit > 0 && stats.categoryBreakdown.Creative > 0}
              icon={Star}
              title="WELL ROUNDED"
              description="Habit in each category"
              progress={`${Object.values(stats.categoryBreakdown).filter(c => c > 0).length} / 4 categories`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Achievement unlocked={stats.totalHabits >= 10} icon={Star} title="HABIT COLLECTOR" description="Create 10 habits" progress={stats.totalHabits < 10 ? `${stats.totalHabits} / 10 habits` : undefined} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AchievementsGrid;
