import boto3
TABLE_NAME = "dydb_users_exams"
# this to specify the index (secondary table)
INDEX_NAME = "gsi1pk-gsi1sk-index"
dynamodb_client = boto3.client('dynamodb')


def lambda_handler(event, context):
    certificationtype = event["pathParameters"]["certificationtype"]
    response = dynamodb_client.query(
        TableName=TABLE_NAME,
        IndexName=INDEX_NAME,
        KeyConditionExpression='#certificationtype = :certificationtype',
        FilterExpression='#pk  <> :frontpage',
        ExpressionAttributeNames={
            '#certificationtype': 'gsi1pk',
            '#pk': 'pk',
        },
        ExpressionAttributeValues={
            ':certificationtype': {'S': certificationtype},
            ':frontpage': {'S': 'frontpage'}
        },
        ScanIndexForward=False)

    data = response['Items']
    return data
