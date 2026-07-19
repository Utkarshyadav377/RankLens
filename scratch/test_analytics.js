import { calculateTopicAnalytics } from '../src/utils/topicAnalytics.js';
import { calculateTopicRatings } from '../src/utils/topicRating.js';
import { calculateCfTagsAnalytics } from '../src/utils/cfTagsAnalytics.js';

const mockSubmissions = [
  {
    verdict: 'OK',
    problem: {
      contestId: 1582,
      index: 'E',
      name: 'Pchelyonok and Segments',
      rating: 2000,
      tags: ['binary search', 'data structures', 'dp', 'greedy', 'math']
    }
  },
  {
    verdict: 'OK',
    problem: {
      contestId: 1322,
      index: 'B',
      name: 'Present',
      rating: 2100,
      tags: ['binary search', 'bitmasks', 'constructive algorithms', 'data structures', 'math', 'sortings']
    }
  }
];

try {
  console.log('Running calculateTopicAnalytics...');
  const analytics = calculateTopicAnalytics(mockSubmissions);
  console.log('calculateTopicAnalytics output:', Object.keys(analytics));

  console.log('Running calculateTopicRatings...');
  const ratings = calculateTopicRatings(analytics, 1500, mockSubmissions);
  console.log('calculateTopicRatings output:', Object.keys(ratings));

  console.log('Running calculateCfTagsAnalytics...');
  const cfTags = calculateCfTagsAnalytics(mockSubmissions, 1500);
  console.log('calculateCfTagsAnalytics output size:', cfTags.length);

  console.log('All functions executed successfully without throwing errors!');
} catch (e) {
  console.error('TEST FAILED:', e);
}
