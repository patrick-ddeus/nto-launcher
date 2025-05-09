import React from 'react';
import { Calendar, User } from 'lucide-react';

const NewsPanel: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: 'New Character: Boruto Uzumaki',
      date: '2025-05-15',
      author: 'Dev Team',
      content: 'We\'re excited to announce that Boruto Uzumaki will be joining the roster in the next update! He comes with unique abilities and an exciting new storyline.',
      image: 'https://images.pexels.com/photos/5806637/pexels-photo-5806637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'update'
    },
    {
      id: 2,
      title: 'Balance Changes Coming Soon',
      date: '2025-05-10',
      author: 'Balance Team',
      content: 'We\'ve heard your feedback and are implementing several balance changes to ensure fair gameplay. Rasengan damage reduced by 10%, Shadow Clone cooldown increased.',
      image: 'https://images.pexels.com/photos/5721851/pexels-photo-5721851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'patch'
    },
    {
      id: 3,
      title: 'Summer Event: Festival of Fire',
      date: '2025-05-05',
      author: 'Event Team',
      content: 'Join us for the Summer Festival of Fire! Complete special missions to earn exclusive rewards, including the Legendary Fire Sage outfit and weapons.',
      image: 'https://images.pexels.com/photos/5063093/pexels-photo-5063093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'event'
    },
    {
      id: 4,
      title: 'New Map: Hidden Leaf Village',
      date: '2025-04-28',
      author: 'Map Design Team',
      content: 'Explore the newly redesigned Hidden Leaf Village with improved graphics, interactive elements, and hidden secrets to discover!',
      image: 'https://images.pexels.com/photos/8047422/pexels-photo-8047422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'update'
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'update':
        return 'bg-naruto-blue text-white';
      case 'event':
        return 'bg-naruto-yellow-dark text-naruto-black';
      case 'patch':
        return 'bg-naruto-leaf text-white';
      default:
        return 'bg-naruto-orange text-white';
    }
  };

  return (
    <div className="h-full p-6 overflow-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Latest News</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured news */}
        <div className="lg:col-span-2">
          <div className="relative w-full h-80 rounded-xl overflow-hidden">
            <img 
              src={newsItems[0].image}
              alt={newsItems[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-naruto-black to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getCategoryColor(newsItems[0].category)}`}>
                {newsItems[0].category.charAt(0).toUpperCase() + newsItems[0].category.slice(1)}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{newsItems[0].title}</h3>
              <p className="text-gray-300 mb-3">{newsItems[0].content}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(newsItems[0].date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{newsItems[0].author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Other news items */}
        {newsItems.slice(1).map(item => (
          <div key={item.id} className="bg-naruto-black-dark/80 rounded-lg overflow-hidden border border-naruto-black-light">
            <div className="h-48 overflow-hidden">
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            
            <div className="p-4">
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(item.category)}`}>
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.content}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{item.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPanel;