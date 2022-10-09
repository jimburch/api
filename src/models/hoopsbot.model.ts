export class Take {
  take: string;
  hot: number;
  cold: number;
  shares: number;

  constructor(take: string, hot = 0, cold = 0, shares = 0) {
    this.take = take;
    this.hot = hot;
    this.cold = cold;
    this.shares = shares;
  }
}

export class TakeRecord extends Take {
  id: number;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    take: string,
    hot: number,
    cold: number,
    shares: number,
    created_at: Date,
    updated_at: Date
  ) {
    super(take, hot, cold, shares);
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
