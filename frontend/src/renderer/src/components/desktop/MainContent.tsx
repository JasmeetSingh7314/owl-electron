import { GameCard, SectionHeader } from './GameCard'
import { Carousel } from './Carousel'
import GameGrid from '../Marketplace/GameGrid'
interface MainContentProps {
  data: any
  onGameClick: (game: any) => void
}
export const MainContent = ({ data, onGameClick }: MainContentProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <Carousel />

      <div className="flex flex-col mt-12 px-16 py-4 gap-8">
        <SectionHeader title="Discover something new" />

        <GameGrid onClick={onGameClick} />

        {/* Top Sellers Column */}
        <section className="grid grid-cols-1 lg:grid-cols-3">
          {' '}
          <div className="">
            <SectionHeader title="Top Sellers" />
            <div className="space-y-4">
              {data?.slice(0, 5).map((game) => (
                <GameCard
                  key={game?.id}
                  index={game?.id}
                  compact
                  title={game?.name}
                  image={game?.cover?.url.replace('t_thumb', 't_1080p')}
                  onClick={() => {
                    onGameClick(game)
                    console.log('Triggered')
                  }}
                />
              ))}
            </div>
          </div>
          {/* Most Played Column */}
          <div>
            <SectionHeader title="Most Played" />
            <div className="space-y-4">
              {data
                ?.slice(0, 5)
                .map((game) => (
                  <GameCard
                    key={game.id}
                    compact
                    index={game?.id}
                    title={game?.name}
                    image={game.cover?.url.replace('t_thumb', 't_1080p')}
                    onClick={() => onGameClick(game)}
                  />
                ))}
            </div>
          </div>
          {/* Top Upcoming Wishlisted Column */}
          <div>
            <SectionHeader title="Top Upcoming Wishlisted" />
            <div className="space-y-4">
              {data
                ?.slice(0, 5)
                .map((game) => (
                  <GameCard
                    key={game?.id}
                    index={game?.id}
                    compact
                    title={game?.name}
                    image={game.cover?.url.replace('t_thumb', 't_1080p')}
                    onClick={() => onGameClick(game)}
                  />
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
