import { Construct } from 'constructs';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';

export class Database2 extends Construct {
  public readonly table: ddb.Table;
  public readonly feedbackIndexName: string;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new ddb.Table(this, 'Table', {
      tableName: 'Prompt-F104A135-1TV528UPTJP43',
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
      sortKey: {
        name: 'createdDate',
        type: ddb.AttributeType.STRING,
      },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
    });
    this.table = table;
  }
}
