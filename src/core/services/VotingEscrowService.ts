import {
  ApproveLockProps,
  ExtendLockTimeProps,
  GetLockAllowanceProps,
  GetSupportedVotingEscrowsProps,
  GetUserVotingEscrowsPositionsProps,
  GetVotingEscrowExpectedTransactionOutcomeProps,
  GetVotingEscrowsDynamicDataProps,
  GetUserVotingEscrowsMetadataProps,
  IncreaseLockAmountProps,
  Position,
  TokenAllowance,
  TransactionResponse,
  VotingEscrow,
  VotingEscrowDynamic,
  VotingEscrowLockProps,
  VotingEscrowService,
  VotingEscrowUserMetadata,
  WithdrawLockedProps,
  WithdrawUnlockedProps,
  YearnSdk,
  Web3Provider,
  TransactionService,
  Config,
  TransactionOutcome,
  MintProps,
} from '@types';

export class VotingEscrowServiceImpl implements VotingEscrowService {
  private yearnSdk: YearnSdk;
  private web3Provider: Web3Provider;
  private transactionService: TransactionService;
  private config: Config;

  constructor({
    yearnSdk,
    web3Provider,
    transactionService,
    config,
  }: {
    yearnSdk: YearnSdk;
    web3Provider: Web3Provider;
    transactionService: TransactionService;
    config: Config;
  }) {
    this.yearnSdk = yearnSdk;
    this.web3Provider = web3Provider;
    this.transactionService = transactionService;
    this.config = config;
  }

  public async getSupportedVotingEscrows({
    network,
    addresses,
  }: GetSupportedVotingEscrowsProps): Promise<VotingEscrow[]> {
    const yearn = this.yearnSdk.getInstanceOf(network);
    return await yearn.votingEscrows.get({ addresses });
  }

  public async getVotingEscrowsDynamicData({
    network,
    addresses,
  }: GetVotingEscrowsDynamicDataProps): Promise<VotingEscrowDynamic[]> {
    const yearn = this.yearnSdk.getInstanceOf(network);
    return await yearn.votingEscrows.getDynamic({ addresses });
  }

  public async getUserVotingEscrowsPositions({
    network,
    accountAddress,
    addresses,
  }: GetUserVotingEscrowsPositionsProps): Promise<Position[]> {
    const yearn = this.yearnSdk.getInstanceOf(network);
    return await yearn.votingEscrows.positionsOf({ accountAddress, addresses });
  }

  public async getExpectedTransactionOutcome({
    network,
    accountAddress,
    transactionType,
    tokenAddress,
    votingEscrowAddress,
    amount,
    time,
  }: GetVotingEscrowExpectedTransactionOutcomeProps): Promise<TransactionOutcome> {
    const yearn = this.yearnSdk.getInstanceOf(network);
    return await yearn.votingEscrows.getExpectedTransactionOutcome({
      accountAddress,
      votingEscrowTransactionType: transactionType,
      tokenAddress,
      votingEscrowAddress,
      amount,
      time,
    });
  }

  public async getUserVotingEscrowsMetadata({
    network,
    accountAddress,
    addresses,
  }: GetUserVotingEscrowsMetadataProps): Promise<VotingEscrowUserMetadata[]> {
    const yearn = this.yearnSdk.getInstanceOf(network);
    return await yearn.votingEscrows.metadataOf({ accountAddress, addresses });
  }

  public async getLockAllowance({
    network,
    accountAddress,
    tokenAddress,
    votingEscrowAddress,
  }: GetLockAllowanceProps): Promise<TokenAllowance> {
    const yearn = this.yearnSdk.getInstanceOf(network);
    return await yearn.votingEscrows.getLockAllowance({ accountAddress, tokenAddress, votingEscrowAddress });
  }

  public async approveLock({
    network,
    accountAddress,
    tokenAddress,
    votingEscrowAddress,
  }: ApproveLockProps): Promise<TransactionResponse> {
    const yearn = this.yearnSdk.getInstanceOf(network);
    return await yearn.votingEscrows.approveLock({
      accountAddress,
      tokenAddress,
      votingEscrowAddress,
    });
  }

  public async lock({
    network,
    accountAddress,
    tokenAddress,
    votingEscrowAddress,
    amount,
    time,
  }: VotingEscrowLockProps): Promise<TransactionResponse> {
    const yearn = this.yearnSdk.getInstanceOf(network);
    return await yearn.votingEscrows.lock({
      accountAddress,
      tokenAddress,
      votingEscrowAddress,
      amount,
      time,
    });
  }

  public async increaseLockAmount({
    network,
    accountAddress,
    votingEscrowAddress,
    amount,
  }: IncreaseLockAmountProps): Promise<TransactionResponse> {
    const yearn = this.yearnSdk.getInstanceOf(network);
    return await yearn.votingEscrows.increaseLockAmount({
      accountAddress,
      votingEscrowAddress,
      amount,
    });
  }

  public async extendLockTime({
    network,
    accountAddress,
    votingEscrowAddress,
    time,
  }: ExtendLockTimeProps): Promise<TransactionResponse> {
    const yearn = this.yearnSdk.getInstanceOf(network);
    return await yearn.votingEscrows.extendLockTime({
      accountAddress,
      votingEscrowAddress,
      time,
    });
  }

  public async withdrawLocked({
    network,
    accountAddress,
    votingEscrowAddress,
  }: WithdrawLockedProps): Promise<TransactionResponse> {
    const yearn = this.yearnSdk.getInstanceOf(network);
    return await yearn.votingEscrows.withdrawLocked({
      accountAddress,
      votingEscrowAddress,
    });
  }

  public async withdrawUnlocked({
    network,
    accountAddress,
    votingEscrowAddress,
  }: WithdrawUnlockedProps): Promise<TransactionResponse> {
    const yearn = this.yearnSdk.getInstanceOf(network);
    return await yearn.votingEscrows.withdrawUnlocked({
      accountAddress,
      votingEscrowAddress,
    });
  }

  public async mint({ network, accountAddress, tokenAddress, amount }: MintProps): Promise<TransactionResponse> {
    const mintTokenAbi = ['function mint(address _to, uint256 _amount) public'];
    return await this.transactionService.execute({
      network,
      methodName: 'mint',
      contractAddress: tokenAddress,
      abi: mintTokenAbi,
      args: [accountAddress, amount],
    });
  }
}
