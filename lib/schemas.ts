export interface SearchCoins {
    coins: Coin[]
    exchanges: Exchange[]
    icos: any[]
    categories: Category[]
    nfts: Nft[]
  }
  
  export interface Coin {
    id: string
    name: string
    api_symbol: string
    symbol: string
    market_cap_rank?: number
    thumb: string
    large: string
  }
  
  export interface Exchange {
    id: string
    name: string
    market_type: string
    thumb: string
    large: string
  }
  
  export interface Category {
    id: string
    name: string
  }
  
  export interface Nft {
    id: string
    name: string
    symbol: string
    thumb: string
  }

  export interface CoinMarketData {
    prices: number[][]
    market_caps: number[][]
    total_volumes: number[][]
  }
  export interface CoinDataById {
    id: string
    symbol: string
    name: string
    web_slug: string
    asset_platform_id: any
    platforms: Platforms
    detail_platforms: DetailPlatforms
    block_time_in_minutes: number
    hashing_algorithm: any
    categories: string[]
    preview_listing: boolean
    public_notice: any
    additional_notices: any[]
    description: Description
    links: Links
    image: Image
    country_origin: string
    genesis_date: any
    sentiment_votes_up_percentage: number
    sentiment_votes_down_percentage: number
    watchlist_portfolio_users: number
    market_cap_rank: number
    status_updates: any[]
    last_updated: string
  }
  
  export interface Platforms {
    "": string
  }
  
  export interface DetailPlatforms {
    "": GeneratedType
  }
  
  export interface GeneratedType {
    decimal_place: any
    contract_address: string
  }
  
  export interface Description {
    en: string
  }
  
  export interface Links {
    homepage: string[]
    whitepaper: string
    blockchain_site: string[]
    official_forum_url: string[]
    chat_url: string[]
    announcement_url: string[]
    snapshot_url: any
    twitter_screen_name: string
    facebook_username: string
    bitcointalk_thread_identifier: number
    telegram_channel_identifier: string
    subreddit_url: string
    repos_url: ReposUrl
  }
  
  export interface ReposUrl {
    github: string[]
    bitbucket: any[]
  }
  
  export interface Image {
    thumb: string
    small: string
    large: string
  }