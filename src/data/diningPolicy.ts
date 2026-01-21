/**
 * Dining Policy / 用餐规则数据
 * 
 * 用于提前解释常见差评点，降低误会型差评
 */

export interface PolicySection {
  id: string;
  titleEN: string;
  titleZH: string;
  bodyEN: string[];
  bodyZH: string[];
}

export const policySections: PolicySection[] = [
  {
    id: "pricing-menu",
    titleEN: "Pricing & Menu",
    titleZH: "价格与菜单",
    bodyEN: [
      "Prices and menu items may vary by location and may change on holidays or special events.",
      "Some locations are KBBQ-only or Hotpot-only. Please check your location page before visiting.",
    ],
    bodyZH: [
      "价格与菜单可能因门店不同而不同，节假日/特殊活动期间也可能调整。",
      "有些门店是\"仅烤肉\"或\"仅火锅\"。到店前请先查看对应门店页面确认。",
    ],
  },
  {
    id: "kids-pricing",
    titleEN: "Kids Pricing (Height-based)",
    titleZH: "儿童价格（按身高）",
    bodyEN: [
      "Our kids pricing is based on height (inches):",
      "• Under 40\": Free",
      "• 40\" to 50\": $9.99",
      "• Over 50\": Full price",
    ],
    bodyZH: [
      "我们的儿童价格按身高（英寸）计算：",
      "• 40英寸以下：免费",
      "• 40-50英寸：$9.99",
      "• 50英寸以上：全价",
    ],
  },
  {
    id: "time-limit-wait",
    titleEN: "Time Limit & Wait",
    titleZH: "用餐时间与等位",
    bodyEN: [
      "During peak hours we may enforce a 90-minute dining limit to serve everyone fairly.",
      "Wait times depend on party size and peak traffic. For large parties, arriving earlier helps.",
    ],
    bodyZH: [
      "高峰期为保证公平，我们可能执行90分钟用餐限制。",
      "等位时间会受人数与客流影响。多人聚餐建议尽量早到或提前沟通。",
    ],
  },
  {
    id: "service-charge-tipping",
    titleEN: "Service Charge & Tipping",
    titleZH: "服务费与小费",
    bodyEN: [
      "Parties of 6+ may have an automatic service charge (clearly shown on the menu/receipt).",
      "Tip suggestions on the terminal are optional—you can always customize the tip amount.",
    ],
    bodyZH: [
      "6人以上可能会自动加收服务费（菜单/小票会显示）。",
      "机器提示的小费为建议值，可自由修改为任意金额。",
    ],
  },
  {
    id: "hotpot-broth-refills",
    titleEN: "Hotpot Broth Refills",
    titleZH: "火锅续汤",
    bodyEN: [
      "For locations that offer hotpot, broth refills will stay in the same flavor you selected whenever possible.",
    ],
    bodyZH: [
      "对提供火锅的门店，续汤会尽量保持你选择的同一口味。",
    ],
  },
  {
    id: "no-waste-policy",
    titleEN: "No-Waste Policy",
    titleZH: "减少浪费政策",
    bodyEN: [
      "To reduce food waste, excessive leftover food may result in an additional charge. Order gradually—our staff is happy to help you reorder.",
    ],
    bodyZH: [
      "为减少浪费，若剩余食物过多，可能会产生额外费用。建议少量多次点单，需要随时加点即可。",
    ],
  },
  {
    id: "restrooms",
    titleEN: "Restrooms",
    titleZH: "洗手间",
    bodyEN: [
      "Restroom supplies are checked regularly. If anything is missing, please tell a staff member and we'll fix it right away.",
    ],
    bodyZH: [
      "我们会定时检查补给。如发现纸巾/清洁等问题，请及时告知员工，我们会立刻处理。",
    ],
  },
  {
    id: "allergens-food-safety",
    titleEN: "Allergens & Food Safety",
    titleZH: "过敏与食品安全",
    bodyEN: [
      "Please inform us of allergies. We'll do our best, but cross-contact is possible in a shared kitchen environment.",
    ],
    bodyZH: [
      "如有过敏请提前告知。共享厨房环境可能存在交叉接触风险，我们会尽力协助降低风险。",
    ],
  },
];

export const policyFooter: {
  titleEN: string;
  titleZH: string;
  bodyEN: string[];
  bodyZH: string[];
} = {
  titleEN: "If Something Wasn't Right",
  titleZH: "如果体验不理想",
  bodyEN: [
    "Please ask for a manager while you're here—we can often correct issues immediately.",
    "If you've already left, message us with date/time/location + a brief description so we can investigate and make it right.",
  ],
  bodyZH: [
    "建议在店内直接找经理，我们通常可以当场补救。",
    "若已离店，欢迎私信提供到店日期/时间/门店 + 简要情况，我们会核实并尽力补救。",
  ],
};
