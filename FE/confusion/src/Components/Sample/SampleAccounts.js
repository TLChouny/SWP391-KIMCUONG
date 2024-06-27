const SampleAccounts = [
    {
        id: '1',
        role: 'manager',
        username: 'long chau',
        phone: '0784871238',
        address: 'Bien Hoa Dong Nai',
        createdAt: '2024-06-20'
    },
    {
        id: '2',
        role: 'admin',
        username: 'admin1',
        phone: '0912345678',
        address: 'Hanoi',
        createdAt: '2024-06-21'
    },
    {
        id: '3',
        role: 'customer',
        username: 'customer1',
        phone: '0923456789',
        address: 'Ho Chi Minh City',
        createdAt: '2024-06-22'
    },
    {
        id: '4',
        role: 'sale staff',
        username: 'sale1',
        phone: '0934567890',
        address: 'Da Nang',
        createdAt: '2024-06-23'
    },
    {
        id: '5',
        role: 'delivery staff',
        username: 'delivery1',
        phone: '0945678901',
        address: 'Can Tho',
        createdAt: '2024-06-24'
    },
    {
        id: '6',
        role: 'manager',
        username: 'manager2',
        phone: '0956789012',
        address: 'Hue',
        createdAt: '2024-06-25'
    },
    {
        id: '7',
        role: 'admin',
        username: 'admin2',
        phone: '0967890123',
        address: 'Hai Phong',
        createdAt: '2024-06-26'
    },
    {
        id: '8',
        role: 'customer',
        username: 'customer2',
        phone: '0978901234',
        address: 'Vung Tau',
        createdAt: '2024-06-27'
    },
    {
        id: '9',
        role: 'sale staff',
        username: 'sale2',
        phone: '0989012345',
        address: 'Nha Trang',
        createdAt: '2024-06-28'
    },
    {
        id: '10',
        role: 'delivery staff',
        username: 'delivery2',
        phone: '0990123456',
        address: 'Quang Ninh',
        createdAt: '2024-06-29'
    },
    {
        id: '11',
        role: 'manager',
        username: 'manager3',
        phone: '0901234567',
        address: 'Binh Duong',
        createdAt: '2024-06-30'
    },
    {
        id: '12',
        role: 'admin',
        username: 'admin3',
        phone: '0912345670',
        address: 'Phu Quoc',
        createdAt: '2024-07-01'
    },
    {
        id: '13',
        role: 'customer',
        username: 'customer3',
        phone: '0923456701',
        address: 'Da Lat',
        createdAt: '2024-07-02'
    },
    {
        id: '14',
        role: 'sale staff',
        username: 'sale3',
        phone: '0934567012',
        address: 'Buon Ma Thuot',
        createdAt: '2024-07-03'
    },
    {
        id: '15',
        role: 'delivery staff',
        username: 'delivery3',
        phone: '0945670123',
        address: 'Long An',
        createdAt: '2024-07-04'
    },
    {
        id: '16',
        role: 'manager',
        username: 'manager4',
        phone: '0956780123',
        address: 'Vinh',
        createdAt: '2024-07-05'
    },
    {
        id: '17',
        role: 'admin',
        username: 'admin4',
        phone: '0967890120',
        address: 'Ha Tinh',
        createdAt: '2024-07-06'
    },
    {
        id: '18',
        role: 'customer',
        username: 'customer4',
        phone: '0978901201',
        address: 'Phan Thiet',
        createdAt: '2024-07-07'
    },
    {
        id: '19',
        role: 'sale staff',
        username: 'sale4',
        phone: '0989012012',
        address: 'Bac Lieu',
        createdAt: '2024-07-08'
    },
    {
        id: '20',
        role: 'delivery staff',
        username: 'delivery4',
        phone: '0990120123',
        address: 'Soc Trang',
        createdAt: '2024-07-09'
    },
    {
        id: '21',
        role: 'manager',
        username: 'manager5',
        phone: '0901230123',
        address: 'Ca Mau',
        createdAt: '2024-07-10'
    },
    {
        id: '22',
        role: 'admin',
        username: 'admin5',
        phone: '0912340123',
        address: 'Tay Ninh',
        createdAt: '2024-07-11'
    },
    {
        id: '23',
        role: 'customer',
        username: 'customer5',
        phone: '0923450123',
        address: 'Ben Tre',
        createdAt: '2024-07-12'
    },
    {
        id: '24',
        role: 'sale staff',
        username: 'sale5',
        phone: '0934560123',
        address: 'Tra Vinh',
        createdAt: '2024-07-13'
    },
    {
        id: '25',
        role: 'delivery staff',
        username: 'delivery5',
        phone: '0945670123',
        address: 'Thai Binh',
        createdAt: '2024-07-14'
    },
    {
        id: '26',
        role: 'manager',
        username: 'manager6',
        phone: '0956780123',
        address: 'Nam Dinh',
        createdAt: '2024-07-15'
    },
    {
        id: '27',
        role: 'admin',
        username: 'admin6',
        phone: '0967890123',
        address: 'Bac Giang',
        createdAt: '2024-07-16'
    },
    {
        id: '28',
        role: 'customer',
        username: 'customer6',
        phone: '0978901230',
        address: 'Ha Nam',
        createdAt: '2024-07-17'
    },
    {
        id: '29',
        role: 'sale staff',
        username: 'sale6',
        phone: '0989012301',
        address: 'Hung Yen',
        createdAt: '2024-07-18'
    },
    {
        id: '30',
        role: 'delivery staff',
        username: 'delivery6',
        phone: '0990123012',
        address: 'Lang Son',
        createdAt: '2024-07-19'
    },
    {
        id: '31',
        role: 'manager',
        username: 'manager7',
        phone: '0901230123',
        address: 'Son La',
        createdAt: '2024-07-20'
    },
    {
        id: '32',
        role: 'admin',
        username: 'admin7',
        phone: '0912340123',
        address: 'Hoa Binh',
        createdAt: '2024-07-21'
    },
    {
        id: '33',
        role: 'customer',
        username: 'customer7',
        phone: '0923450123',
        address: 'Bac Ninh',
        createdAt: '2024-07-22'
    },
    {
        id: '34',
        role: 'sale staff',
        username: 'sale7',
        phone: '0934560123',
        address: 'Yen Bai',
        createdAt: '2024-07-23'
    },
    {
        id: '35',
        role: 'delivery staff',
        username: 'delivery7',
        phone: '0945670123',
        address: 'Dien Bien',
        createdAt: '2024-07-24'
    }
];
export default SampleAccounts;