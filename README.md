# Non-Pharmasutical Intervention Measures by State 

## Policy Report

Date: May 4, 2020  
Subject: To assess the effectiveness of states’ non-pharmaceutical measures in stopping the spread of COVID-19 and recommend an effective state policy response   
Written by: Laina Emmons, Matthew Gorman, Kirsten Meidlinger, Mark Krupinski, Dasha Yerokhin  

### Context:
Upon the first known US COVID-19 case on January 20, 2020, states have begun implementing stay at home policies in order to reduce the growth rate of new cases and deaths. Most states (41 to date) have issued some form of state-wide stay at home order, though these policies have differed in restrictiveness. Public officials have called for individuals to “flatten the curve”, a collective effort to reduce new case rates in order to avoid overwhelming the national healthcare system’s capacity. It has been debated whether these mandates are necessary or effective, resulting in public protests in some states. In this memo, we hope to explore if non pharmaceutical intervention measures have been effective in reducing the spread of new cases and deaths. Further, we hope to determine which states have most effectively implemented these policies and see a subsequent reduction in COVID-19 cases.    
  
### Research:
To begin, we considered the way in which we wanted to view the data because the numbers raw are overwhelming. The best way to view what we’re looking into, we determined, is by creating interactive choropleth maps and interactive line graphs. Without these visual aids, the data is incredibly difficult to assess.   
  
The first map is Responsiveness of Stay-at-Home Orders which shows us easily the time between a state’s first case and their implementation of a stay-at-home order using a color fade to display passage of time. The information on the side bar also shows cumulative cases and deaths to date, the exact number of days between the first case and stay at home order, as well as the state of emergency declaration. This map helps us visualize how responsive states were to the appearance of the virus and overlay it with our other graphs to show if responsiveness effected infection rates in any way.   
  
We created a severity score for each state (including DC) that took into account the policies enacted and measures taken to slow the spread of the coronavirus with a data set from the Henry J. Kaiser Family Foundation. The score takes into account six categories: Stay at home orders, Mandatory quarantine policies for travelers, Non-essential business closures, Large social gathering bans, Limitations on bars and restaurants, and Postponement of  primary elections. A state’s severity score  increases when a state enacts a policy in response to the pandemic. The value it increases by depends on how strict the policy is relative to what other states have done. For example, for Limitations on bars and restaurants, limited on-site service adds 1 to the severity score, only allowing take-out and delivery, a more severe policy, adds 2, and no action with respect to restaurants adds 0. In the Kaiser Family Foundation dataset, some states had “Other” written for a category, so we found additional information from different state executive orders to fill in what best fit that state’s response more recently.  
  
We used the severity score to create the Implementations of US Stay-At-Home Orders visualization. In the map, each state is colored according to their severity score, the higher the score the darker shade of red the state appears. When a user hovers their mouse over a state, their overall severity score, as well as a list of how they responded in each of the six subcategories is displayed on the right.  
  
The COVID Rates Over Time map is a real-time updated map that collects infection rates for each day and displays a color associated with how high the rate is. The deeper red the state gets,the higher the infection rate is, the closer it gets to white the lower the rate is. We found this to be incredibly useful to compare to the Implementations map, as mentioned.   
  
The amount of cases was considered between states that had a preventative policy implementation to states that did not implement a stay at home order by April 7th, 2020. The states that had a preventative policy implementation are Delaware, Idaho, Indiana, Louisiana, Michigan, New Mexico, Ohio, and West Virginia. The states that did not implement a state-wide policy were Arkansas, Iowa, Kentucky, Massachusetts, Nebraska, North Dakota, Oklahoma, South Carolina, Utah, and Wyoming. We used data from March 15th, 2020 to April 28th, 2020. Before March 15th, the number of cases was relatively small and close together; this would not improve the analysis.  
  
In comparing the number of cases, we compared the number of cases in each state relative to 1,000 individuals in each state. This prevents large states from appearing more severe solely by having a larger population. Additionally, we compared the number of cases in each state relative to 1,000 individuals in an urbanized area. An urbanized area, as defined by the U.S. census, is an area with a population of 50,000 or more individuals. This aligns with the belief that stay-at-home policies are more effective at limiting the spread in urbanized areas.   
  
Using this data, we projected the number of cases by fitting the data to a 3rd degree polynomial regression. We opted to use a 3rd degree polynomial to best represent the initial flat curve, the gradual increase, and the flattening at the top. A 2nd degree polynomial failed to flatten the curve at the peak. Our model will not demonstrate the flattening of the curve at the tail end, due to the model not being able to portray it as it lacks the data. The model is useful for exploring the peak number of cases and an expected date.  
  
Finally, we compared the percent increase of new cases each day in states with no stay-at-home orders to states with preventative policy implementations.  
  
## Findings:  
Using these visualizations, we were able to observe which states were effective in lowering their rate of new cases. Overall, it appears that after about April 10th, the states that show the most percent growth in their number of cases have been those that have not issued any state wide stay at home orders.   
  
Comparing the two groups of states as mentioned above, states that do not issue a stay-at-home order have a lower number of cases per thousand residents than states that issued a preventative measure. This is true for all data since March 15th, with the largest difference of approximately one case per thousand residents on April 28th.  
  
If you compare the Implementations of US Stay-At-Home Orders map with the COVID-19 Rates Over Time map, you can see that states with a lower severity score have higher COVID-19 growth rates over a longer period of time, and states with a higher severity score have high COVID-19 growth rates for a short period of time after their first case, followed by a long period of much lower growth rates. For example, states like South Dakota, Iowa and Arkansas, states that have not implemented statewide stay-at-home orders are shown with higher COVID-19 growth rates. In the COVID-19 Rates Over Time map, the growth rates of most states slow down around early April, but South Dakota, Iowa and Arkansas are still shown with relatively high growth rates even during the entire month of April.  
  
However, when comparing cases per thousand residents in urbanized areas, the results differ. Initially, the rates are approximately the same until April 18th. After April 18th, the number of cases begins to flatten out in states with preventative policy measures, while states that did not implement a stay at home order continue to see the number of cases increase. On April 28th, the states that did not implement stay at home policy had approximately 0.5 more cases per 1,000 residents in an urbanized area than states that had a preventative policy implementation.  
  
Using the rates from the urbanized area, we projected the data by fitting the data to a 3rd degree polynomial. The peak number of cases drastically differs in amount and date among the two groups. Preventative policy states are projected, on average, to peak at 3.643 cases per 1,000 residents in urbanized areas on May 3rd, 2020 while states that did not implement stay at home orders peak at 17.819 cases per 1,000 residents in urbanized areas on August 1st, 2020. However, our model is not necessarily a strong fit; the adjusted R-squared values of the models are 0.388 and 0.2045 respectively which do not indicate a strong fit to the data.  
  
## Recommendation:
Upon the first known case of a potentially infectious virus for which there is no known vaccine, states - specifically with higher urban populations - should issue statewide stay at home orders as a non pharmaceutical intervention measure in order to slow the spread of the virus.  
  
## Tradeoffs to Consider:
It seems that the aforementioned policy recommendation would be more beneficial for states with a higher urban population. This is because it is reasonable to assume that states with more densely-populated areas are more susceptible to contagious virus outbreaks, and would therefore benefit more from stay at home measures. Further, a trade-off to note pertains to state economies, which may be adversely impacted by such a restrictive policy. Because consumers’ ability to spend would be hindered (decreasing the liquidity in the economy),  a more restrictive stay at home measure may invoke a need for fiscal stimulus. Additionally, implementing stay at home orders may increase the unemployment rate, due to individuals’ ability to work and seek employment. Despite this, we still believe that, in the absence of a readily-available vaccine or treatment, highly contagious viruses must be contained through restrictive measures such as stay at home measures.  



## Data Sources

This project was made for HSS 360 - Public Policy Analysis

Pages built from template by Alex Wellerstein


Date of first reported COVID-19 Case:	https://www.kaggle.com/fireballbyedimyrnmom/us-counties-covid-19-dataset		

Date of State of Emergency Decleration:	https://en.wikipedia.org/wiki/U.S._state_and_local_government_response_to_the_2020_coronavirus_pandemic	

Date of Stay at Home Orders. Only strict oders are listed, Advisories or suggestions are listed as N/A:	https://en.wikipedia.org/wiki/U.S._state_and_local_government_response_to_the_2020_coronavirus_pandemic	
		

Data for Cases and Deaths by State (Updated Daily): https://github.com/nytimes/covid-19-data/blob/master/us-states.csv		
		

State Data and Policy Actions to Address Coronavirus:	https://www.kff.org/health-costs/issue-brief/state-data-and-policy-actions-to-address-coronavirus/	

info on kentucky travel restriction:	https://governor.ky.gov/attachments/20200402_Executive-Order_2020-266_State-of-Emergency.pdf	

info on georgia business closures (exec order 04.03.20.02):	https://gov.georgia.gov/executive-action/executive-orders/2020-executive-orders	

info on iowa business closures:	https://governor.iowa.gov/press-release/gov-reynolds-signs-new-proclamation-continuing-state-public-health-emergency-3	

info on north dakota business closures:	https://www.governor.nd.gov/sites/www/files/documents/executive-orders/Executive%20Order%202020-06.2.pdf	

info on connecticut social gatherings ban:	https://portal.ct.gov/-/media/Office-of-the-Governor/Executive-Orders/Lamont-Executive-Orders/Executive-Order-No-7X.pdf	

info on florida social gatherings ban:	https://www.flgov.com/wp-content/uploads/orders/2020/EO_20-91.pdf	

info on rhode island social gatherings ban:	https://governor.ri.gov/documents/orders/Executive-Order-20-14.pdf	

info on west virginia social gatherings ban:	https://apps.sos.wv.gov/adlaw/executivejournal/readpdf.aspx?DocID=89504	

info on oklahoma restaurants/take-out:	https://www.sos.ok.gov/documents/executive/1935.pdf	
		
