type BidItem = {
	id: string,
	name: string,
	addQuality: string,
	manufacturingTime: number,
	warrantyPeriod: number,
	payTerms: number,
	cost: number,
	discount: number
}


export const BidsData: BidItem[] = [
	{
		id: '001',
		name: 'Участник 1',
		addQuality: '',
		manufacturingTime: 80,
		warrantyPeriod: 24,
		payTerms: 30,
		cost: 3700000,
		discount: 25000,
	},
	{
		id: '002',
		name: 'Участник 2',
		addQuality: '',
		manufacturingTime: 90,
		warrantyPeriod: 24,
		payTerms: 100,
		cost: 3200000,
		discount: 25000,
	},
	{
		id: '003',
		name: 'Участник 3',
		addQuality: '',
		manufacturingTime: 75,
		warrantyPeriod: 22,
		payTerms: 60,
		cost: 2800000,
		discount: 25000,
	},
	{
		id: '004',
		name: 'Участник 4',
		addQuality: '',
		manufacturingTime: 120,
		warrantyPeriod: 36,
		payTerms: 50,
		cost: 2500000,
		discount: 25000,
	},
] 