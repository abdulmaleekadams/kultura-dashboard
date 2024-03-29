import dayjs from 'dayjs';

export type DealAggregate = {
  closeDateMonth?: number;
  closeDateYear?: number;
  sum?: {
    value?: number;
  };
  state: string;
};

type MappedDealData = {
  timeUnix: number;
  timeText: string;
  value: number;
  state: string;
};

// Get the date in the format "MMM DD, YYYY - HH:mm"
export const getDate = (startDate: string, endDate: string) => {
  const start = dayjs(startDate).format('MMM DD, YYYY - HH:mm');
  const end = dayjs(endDate).format('MMM DD, YYYY - HH:mm');

  return `${start} - ${end}`;
};

// Filter out deals that don't have a closeDateMonth or closeDateYear
const filterDeal = (deal?: DealAggregate) =>
  deal?.closeDateMonth !== undefined && deal?.closeDateYear !== undefined;

const mapDeals = (
  deals: DealAggregate[] = [],
  state: string
): MappedDealData[] => {
  // filter out deals that don't have a closeDateMonth or closeDateYear
  return deals.filter(filterDeal).map((deal) => {
    // Get the closeDateMonth and closeDateYear from the deal
    const { closeDateMonth, closeDateYear } = deal;

    // Create a date object from the closeDateMonth and closeDateYear
    const date = dayjs(`${closeDateYear}-${closeDateMonth}-01`);

    // Return the mapped deal data
    return {
      // Convert the date to a unix timestamp i.e., 1622505600000
      timeUnix: date.unix(),
      // Convert the date to a string i.e., "May 2021"
      timeText: date.format('MMM YYYY'),
      // Get the sum of all deals in this stage
      value: deal.sum?.value ?? 0,
      state,
    };
  });
};

// Map deals data to the format required by the chart
export const mapDealsData = (
  dealStages: DealAggregate[] = [],
  states: string[] = []
): MappedDealData[] => {
  // Combine the deals for all states and sort them by time
  return states
    .flatMap((state) => {
      const deals = mapDeals(
        dealStages.filter((deal) => deal.state === state),
        state
      );
      return deals;
    })
    .sort((a, b) => a.timeUnix - b.timeUnix);
};

