/* global rs, print */


print('===== Start: ReplicaSet initiate =====');

// Initiate the Replica Set
rs.initiate();

// rs.initiate({
//     _id: 'rs0',
//     members: [{
//         _id: 0, host: '127.0.0.1:27017'
//     }]
// })

print('===== End: ReplicaSet initiate =====');
