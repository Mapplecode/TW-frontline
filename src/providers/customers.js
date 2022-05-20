const user = require('../config');
const customersToWorkersMap = {};
console.log(user.cust.newapicustomers);
const customers = user.cust.newapicustomers;

// const customers = [
//     {
//     customer_id: 1,
//     display_name: 'Mapple code user',
//     channels: [
//         { type: 'email', value: 'mapplecode2020@gmail.com' },
//         { type: 'sms', value: '+917807445246' },
//         { type: 'whatsapp', value: '+917807445246' }
//     ],
//     links: [
//         { type: 'Facebook', value: 'https://facebook.com', display_name: 'Social Media Profile' }
//     ],
    
//     worker: 'webmaster@louisvillementalhealth.org'
//  },
//  {
//     customer_id: 2,
//     display_name: 'Test',
//     channels: [
//         { type: 'email', value: 'testuser.org' },
//         { type: 'sms', value: '+917018192644'},
//     ],
//     links: [
//         { type: 'Facebook', value: 'https://facebook.com', display_name: 'Social Media Profile' }
//     ],
//     worker: 'webmaster@louisvillementalhealth.org'
//  },
//  {
//     customer_id: 3,
//     display_name: 'Tyler',
//     channels: [
//         { type: 'email', value: 'testuser.org' },
//         { type: 'sms', value: '+15022945549'},
//     ],
//     links: [
//         { type: 'Facebook', value: 'https://facebook.com', display_name: 'Social Media Profile' }
//     ],
//     worker: 'webmaster@louisvillementalhealth.org'
//  }
// ];

const findWorkerForCustomer = async (customerNumber) => customersToWorkersMap[customerNumber];

const findRandomWorker = async () => {
    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    const workers = Object.values(customersToWorkersMap).filter(onlyUnique)
    const randomIndex = Math.floor(Math.random() * workers.length)

    return workers[randomIndex]
}

const getCustomersList = async (worker, pageSize, anchor) => {
    const workerCustomers = customers.filter(customer => customer.worker === worker);
    const list = workerCustomers.map(customer => ({
        display_name: customer.display_name,
        customer_id: customer.customer_id,
        avatar: customer.avatar,
    }));

    if (!pageSize) {
        return list
    }

    if (anchor) {
        const lastIndex = list.findIndex((c) => String(c.customer_id) === String(anchor))
        const nextIndex = lastIndex + 1
        return list.slice(nextIndex, nextIndex + pageSize)
    } else {
        return list.slice(0, pageSize)
    }
};

const getCustomerByNumber = async (customerNumber) => {
    return customers.find(customer => customer.channels.find(channel => String(channel.value) === String(customerNumber)));
};

const getCustomerById = async (customerId) => {
    return customers.find(customer => String(customer.customer_id) === String(customerId));
};

module.exports = {
    customersToWorkersMap,
    findWorkerForCustomer,
    findRandomWorker,
    getCustomerById,
    getCustomersList,
    getCustomerByNumber
};
