export class Take {
  take: string;
  hot: number;
  cold: number;
  shares: number;
  created_at: Date;
  updated_at: Date;

  constructor(
    take: string,
    hot = 0,
    cold = 0,
    shares = 0,
    created_at = new Date(),
    updated_at = new Date()
  ) {
    this.take = take;
    this.hot = hot;
    this.cold = cold;
    this.shares = shares;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  voteHot() {
    this.hot++;
    this.updated_at = new Date();
  }

  removeHot() {
    this.hot--;
    this.updated_at = new Date();
  }

  voteCold() {
    this.cold++;
    this.updated_at = new Date();
  }

  removeCold() {
    this.cold--;
    this.updated_at = new Date();
  }

  shareTake() {
    this.shares++;
    this.updated_at = new Date();
  }
}
