export class TransactionRepositoryMock {
  findOne = jest.fn(() => ({
    id: 'dkdkd',
    password: 'forfeoffpepog',
    toJSON: function () {
      return {
        id: 'djfdjhfjf',
      };
    },
  }));
}

export class TransactionServiceMock {
  save() {
    console.log('check me');
  }
}
