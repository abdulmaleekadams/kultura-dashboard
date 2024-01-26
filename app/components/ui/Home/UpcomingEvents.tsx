import { Badge, Card, Col, List } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { Text } from '../../Text';
import { Suspense } from 'react';
import { UpcomingEventsSkeleton } from '../..';
import { getDate } from '@/utils/helpers';
import UpcomingEvent from './UpcomingEvent';

const mockEvents = [
  {
    title: 'Tech Summit 2024',
    startDate: '2024-02-01',
    endDate: '2024-02-03',
    color: 'blue',
    location: 'Virtual Event',
    description: 'Join us for the latest in technology trends and innovations.',
  },
  {
    title: 'Product Launch Webinar',
    startDate: '2024-02-05',
    endDate: '2024-02-07',
    color: 'green',
    location: 'Online',
    description:
      'Be the first to see our new product lineup. Exclusive offers for attendees!',
  },
  {
    title: 'Conference on Sustainable Development',
    startDate: '2024-03-15',
    endDate: '2024-03-18',
    color: 'orange',
    location: 'City Convention Center',
    description:
      'Explore ideas and solutions for a sustainable future. Keynote speakers and workshops.',
  },
  {
    title: 'UX/UI Design Workshop',
    startDate: '2024-04-10',
    endDate: '2024-04-12',
    color: 'purple',
    location: 'Design Institute',
    description:
      'Hands-on workshop on the latest trends and best practices in UX/UI design.',
  },
  {
    title: 'Startup Pitch Day',
    startDate: '2024-05-20',
    endDate: '2024-05-22',
    color: 'red',
    location: 'Innovation Hub',
    description:
      'Witness exciting pitches from innovative startups. Investors and mentors welcome!',
  },
  {
    title: 'Health and Wellness Expo',
    startDate: '2024-06-15',
    endDate: '2024-06-17',
    color: 'green',
    location: 'Wellness Center',
    description:
      'Discover the latest in health and wellness products and services. Free health checks available!',
  },
  {
    title: 'International Film Festival',
    startDate: '2024-07-10',
    endDate: '2024-07-15',
    color: 'pink',
    location: 'City Cinema',
    description:
      'Experience a showcase of the finest films from around the world. Special screenings and Q&A sessions.',
  },
  {
    title: 'Food and Wine Tasting Event',
    startDate: '2024-08-20',
    endDate: '2024-08-22',
    color: 'orange',
    location: 'Gourmet Hall',
    description:
      'Indulge in a culinary journey with exquisite food and wine pairings. Live cooking demonstrations.',
  },
  {
    title: 'Global Business Summit',
    startDate: '2024-09-15',
    endDate: '2024-09-18',
    color: 'blue',
    location: 'Business Center',
    description:
      'Connect with global industry leaders and experts. Panel discussions on the future of business.',
  },
  {
    title: 'Music Festival',
    startDate: '2024-10-25',
    endDate: '2024-10-28',
    color: 'purple',
    location: 'City Park',
    description:
      'Enjoy performances from top artists across genres. Food trucks, art installations, and more!',
  },
];

const UpcomingEvents = () => {
  return (
    <Col xs={24} sm={24} xl={8} style={{ height: '460px' }}>
      
      <Card
        style={{ height: '100%' }}
        headStyle={{ padding: '8px 16px' }}
        bodyStyle={{ padding: '0 1rem' }}
        title={
          <div className='flex items-center gap-2'>
            <CalendarOutlined />
            <Text size='sm' className='ml-3'>
              Upcoming Events
            </Text>
          </div>
        }
      >
        <Suspense fallback={<UpcomingEventsSkeleton />}>
          {mockEvents?.length === 0 ? (
            <span className='flex justify-center items-center h-32'>No Upcoming events</span>
          ) : (
            <List itemLayout='horizontal'>
              {mockEvents.slice(0, 5).map((item, idx) => (
                <UpcomingEvent key={`evt-${idx}`} item={item} />
              ))}
            </List>
          )}
        </Suspense>
      </Card>
    </Col>
  );
};

export default UpcomingEvents;
