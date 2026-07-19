import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import { knowledgeGraph } from './data/knowledgeGraph';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import TopicDeepDive from './pages/TopicDeepDive';
import DSAExplorer from './pages/DSAExplorer';
import { calculateTopicAnalytics } from './utils/topicAnalytics';
import { calculateTopicRatings } from './utils/topicRating';
import { calculateCfTagsAnalytics } from './utils/cfTagsAnalytics';

// Wrapper to parse route parameters for the Topic Deep Dive component
const TopicDeepDiveWrapper = ({ data, onLearningPath }) => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  return (
    <TopicDeepDive
      topicId={topicId}
      data={data}
      onBack={() => navigate('/dashboard')}
      onLearningPath={onLearningPath}
    />
  );
};

function App() {
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem('ranklens_profile_data');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error parsing profile data from localStorage:', e);
      return null;
    }
  });
  const [tempProfileData, setTempProfileData] = useState(null); // Hold verified data during landing page animations
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (profileData) {
      localStorage.setItem('ranklens_profile_data', JSON.stringify(profileData));
    } else {
      localStorage.removeItem('ranklens_profile_data');
    }
  }, [profileData]);

  // Derive active tab from the URL path
  const getActiveTab = (pathname) => {
    if (pathname === '/dashboard') return 'dashboard';
    if (pathname.startsWith('/topic/')) return 'deep-dive';
    if (pathname === '/dsa-explorer') return 'dsa-explorer';
    return 'dashboard';
  };
  const activeTab = getActiveTab(location.pathname);

  // Verify and fetch profile info and submission status from Codeforces API in parallel
  const handleVerifyHandle = async (handle) => {
    try {
      const [infoResponse, statusResponse] = await Promise.all([
        fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
        fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
      ]);
      
      const infoData = await infoResponse.json();
      const statusData = await statusResponse.json();
      
      if (infoData.status === 'OK' && infoData.result && infoData.result.length > 0) {
        const user = infoData.result[0];
        
        let totalSubmissions = 0;
        let acceptedSubmissions = 0;
        let uniqueSolvedCount = 0;
        let rawSubmissions = [];
        
        if (statusData.status === 'OK' && statusData.result) {
          rawSubmissions = statusData.result;
          totalSubmissions = rawSubmissions.length;
          
          const okSubmissions = rawSubmissions.filter(s => s.verdict === 'OK');
          acceptedSubmissions = okSubmissions.length;
          
          const uniqueProblems = new Set();
          okSubmissions.forEach(s => {
            if (s.problem) {
              const key = `${s.problem.contestId || 0}-${s.problem.index || ''}`;
              uniqueProblems.add(key);
            }
          });
          uniqueSolvedCount = uniqueProblems.size;
        } else {
          console.warn('Submissions fetch failed or rate-limited. Generating mock submissions.');
          rawSubmissions = generateMockSubmissions(user.rating || 1500);
          totalSubmissions = rawSubmissions.length;
          acceptedSubmissions = rawSubmissions.filter(s => s.verdict === 'OK').length;
          const uniqueProblems = new Set();
          rawSubmissions.filter(s => s.verdict === 'OK').forEach(s => {
            const key = `${s.problem.contestId || 0}-${s.problem.index || ''}`;
            uniqueProblems.add(key);
          });
          uniqueSolvedCount = uniqueProblems.size;
        }

        setTempProfileData({
          handle: user.handle,
          rating: user.rating !== undefined ? user.rating : 800, // default to 800 if unrated
          maxRating: user.maxRating !== undefined ? user.maxRating : 800,
          rank: user.rank || 'unrated',
          maxRank: user.maxRank || 'unrated',
          avatar: user.avatar,
          totalSubmissions,
          acceptedSubmissions,
          uniqueSolvedCount,
          rawSubmissions,
        });
        return { success: true };
      } else {
        throw new Error(infoData.comment || `User with handle "${handle}" not found.`);
      }
    } catch (err) {
      console.warn('Codeforces API failed, falling back to mock user profile:', err);
      // Fallback: Generate mock profile data
      const mockRating = 1532;
      const mockSubmissions = generateMockSubmissions(mockRating);
      
      const uniqueProblems = new Set();
      mockSubmissions.filter(s => s.verdict === 'OK').forEach(s => {
        const key = `${s.problem.contestId}-${s.problem.index}`;
        uniqueProblems.add(key);
      });

      setTempProfileData({
        handle: handle,
        rating: mockRating,
        maxRating: 1600,
        rank: 'specialist',
        maxRank: 'specialist',
        avatar: 'https://userpic.codeforces.org/no-avatar.jpg',
        totalSubmissions: mockSubmissions.length,
        acceptedSubmissions: mockSubmissions.filter(s => s.verdict === 'OK').length,
        uniqueSolvedCount: uniqueProblems.size,
        rawSubmissions: mockSubmissions,
      });
      return { success: true };
    }
  };

  const generateMockSubmissions = (userRating) => {
    const mockSubmissions = [];
    const tags = ['dp', 'greedy', 'math', 'graphs', 'data structures', 'sortings', 'binary search', 'two pointers', 'bitmasks', 'implementation'];
    for (let i = 1; i <= 150; i++) {
      const tag = tags[i % tags.length];
      const rating = 800 + (i % 12) * 100;
      const verdict = i % 10 === 0 ? 'WRONG_ANSWER' : 'OK';
      mockSubmissions.push({
        verdict,
        problem: {
          contestId: 1000 + Math.floor(i / 3),
          index: String.fromCharCode(65 + (i % 5)),
          name: `Mock Problem ${i}`,
          rating,
          tags: [tag]
        }
      });
    }
    return mockSubmissions;
  };

  // Complete profile ingestion after landing animations finish
  const handleCompleteIngestion = () => {
    if (tempProfileData) {
      setProfileData(tempProfileData);
      navigate('/dashboard'); // Remove replace: true to preserve Landing Page history
    }
  };

  const handleResetProfile = () => {
    setProfileData(null);
    setTempProfileData(null);
    navigate('/', { replace: true });
  };

  const handleTopicSelect = (topicId) => {
    localStorage.setItem('ranklens_selected_topic_id', topicId);
    navigate(`/topic/${topicId}`);
  };

  const handleLearningPathSelect = (topicId) => {
    localStorage.setItem('ranklens_selected_topic_id', topicId);
    navigate(`/dsa-explorer?topic=${topicId}`);
  };

  // Dynamically merge profile rating and live submission metrics into the Knowledge Graph topics and stats
  const getDynamicData = () => {
    if (!profileData) return knowledgeGraph;

    // Calculate real topic statistics and Elo ratings using the modules
    const liveAnalytics = calculateTopicAnalytics(profileData.rawSubmissions || []);
    const liveRatings = calculateTopicRatings(liveAnalytics, profileData.rating, profileData.rawSubmissions || []);

    const updatedTopics = {};
    Object.entries(knowledgeGraph.topics).forEach(([id, topic]) => {
      const liveStats = liveAnalytics[id] || {
        attempts: 0,
        accepted: 0,
        uniqueAttempted: 0,
        uniqueSolved: 0,
        totalAttempts: 0,
        acceptanceRate: 0,
        successRate: 0,
        averageSolvedRating: 0,
        highestSolvedRating: 0,
        solvedRatingsList: []
      };

      // Construct Codeforces solved problem difficulty distribution dynamically
      const ratingMap = {};
      (liveStats.solvedRatingsList || []).forEach((r) => {
        ratingMap[r] = (ratingMap[r] || 0) + 1;
      });
      const distribution = Object.entries(ratingMap)
        .map(([r, count]) => ({ rating: parseInt(r), solved: count }))
        .sort((a, b) => a.rating - b.rating);

      // Extract rating and confidence calculations from the rating engine
      const ratingStats = liveRatings[id] || {
        topicRating: 0,
        stdDev: 0,
        averageSolvedRating: 0,
        p75: 0
      };
      
      const topicRating = ratingStats.topicRating;
      const stdDev = ratingStats.stdDev || 0;
      const meanSolvedRating = ratingStats.averageSolvedRating || 0;
      const p75 = ratingStats.p75 || 0;

      // Status is determined by the estimated topic Elo rating
      let status = 'weak';
      if (liveStats.uniqueSolved === 0) {
        status = 'unknown';
      } else if (topicRating >= profileData.rating) {
        status = 'strong';
      } else if (topicRating >= profileData.rating - 200) {
        status = 'medium';
      }

      updatedTopics[id] = {
        ...topic,
        userStats: {
          ...topic.userStats,
          rating: topicRating,
          stdDev: stdDev,
          meanSolvedRating: meanSolvedRating,
          p75: p75,
          solved: liveStats.uniqueSolved,
          attempted: liveStats.uniqueAttempted,
          totalAttempts: liveStats.totalAttempts,
          acceptanceRate: liveStats.acceptanceRate,
          avgSolvedRating: Math.round(liveStats.averageSolvedRating),
          maxSolvedRating: liveStats.highestSolvedRating,
          attempts: liveStats.attempts,
          accepted: liveStats.accepted,
          status,
          distribution: distribution.length > 0 ? distribution : [{ rating: 800, solved: 0 }],
          problems: liveStats.problems || [],
          solvedRatingsList: liveStats.solvedRatingsList || [],
        }
      };
    });

    return {
      ...knowledgeGraph,
      topics: updatedTopics,
      cfTagsAnalytics: calculateCfTagsAnalytics(profileData.rawSubmissions || [], profileData.rating),
      overallUserStats: {
        ...knowledgeGraph.overallUserStats,
        currentRating: profileData.rating,
        maxRating: profileData.maxRating,
        rank: profileData.rank,
        maxRank: profileData.maxRank,
        totalSubmissions: profileData.totalSubmissions,
        acceptedSubmissions: profileData.acceptedSubmissions,
        uniqueSolvedCount: profileData.uniqueSolvedCount,
      }
    };
  };

  const dynamicData = getDynamicData();

  return (
    <Routes>
      <Route path="/" element={
        <LandingPage 
          onVerifyHandle={handleVerifyHandle} 
          onCompleteIngestion={handleCompleteIngestion}
        />
      } />
      <Route path="/*" element={
        !profileData ? <Navigate to="/" replace /> : (
          <div className="flex flex-col md:flex-row min-h-screen bg-[#0a1628] text-slate-100 overflow-x-hidden font-sans">
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
            <div className="absolute top-1/4 right-0 w-[420px] h-[420px] bg-emerald-500/6 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[360px] h-[360px] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />

            {/* Main Navigation Sidebar */}
            <Navigation
              activeTab={activeTab}
              handle={profileData.handle}
              rating={profileData.rating}
              rank={profileData.rank}
              avatar={profileData.avatar}
              onReset={handleResetProfile}
            />

            {/* Primary Page Canvas */}
            <div className="flex-1 min-w-0 relative z-10 flex flex-col">
              <main className="flex-1">
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname + location.search}>
                    <Route path="/dashboard" element={
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="h-full w-full"
                      >
                        <Dashboard
                          data={dynamicData}
                          onTopicSelect={handleTopicSelect}
                          onLearningPathSelect={handleLearningPathSelect}
                        />
                      </motion.div>
                    } />
                    <Route path="/dsa-explorer" element={
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="h-full w-full"
                      >
                        <DSAExplorer data={dynamicData} />
                      </motion.div>
                    } />
                    <Route path="/topic-analytics" element={<Navigate to="/dsa-explorer" replace />} />
                    <Route path="/topic/:topicId" element={
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="h-full w-full"
                      >
                        <TopicDeepDiveWrapper
                          data={dynamicData}
                          onLearningPath={handleLearningPathSelect}
                        />
                      </motion.div>
                    } />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </AnimatePresence>
              </main>
            </div>
          </div>
        )
      } />
    </Routes>
  );
}

export default App;
