import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockBookings, mockAircraft } from '@/data/mockData';
import { BarChart, FileText, Download, TrendingUp, DollarSign, Clock, Plane } from 'lucide-react';
import { format } from 'date-fns';

const Reports = () => {
  const totalBookings = mockBookings.length;
  const completedBookings = mockBookings.filter(b => b.status === 'completed').length;
  const inTransit = mockBookings.filter(b => b.status === 'in_transit').length;
  const totalRevenue = mockBookings.reduce((sum, b) => sum + (b.estimatedCost || 0), 0);
  const avgFlightTime = Math.round(
    mockBookings.reduce((sum, b) => sum + (b.estimatedFlightTime || 0), 0) / totalBookings
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">View operational reports and billing</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookings}</div>
              <p className="text-xs text-muted-foreground">All time transfers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedBookings}</div>
              <p className="text-xs text-muted-foreground">
                {((completedBookings / totalBookings) * 100).toFixed(0)}% completion rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</div>
              <p className="text-xs text-muted-foreground">Total estimated revenue</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Flight Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgFlightTime} min</div>
              <p className="text-xs text-muted-foreground">Average transfer duration</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings">
          <TabsList>
            <TabsTrigger value="bookings">Booking Reports</TabsTrigger>
            <TabsTrigger value="aircraft">Aircraft Utilization</TabsTrigger>
            <TabsTrigger value="billing">Billing & Invoices</TabsTrigger>
            <TabsTrigger value="sla">SLA Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Booking Activity Report</CardTitle>
                <CardDescription>Filter and export booking records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Select defaultValue="month">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in_transit">In Transit</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Urgency</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="routine">Routine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="border rounded-lg">
                  <div className="p-4 bg-muted font-semibold grid grid-cols-5 text-sm">
                    <div>Booking ID</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>Urgency</div>
                    <div>Cost</div>
                  </div>
                  {mockBookings.map(booking => (
                    <div key={booking.id} className="p-4 grid grid-cols-5 text-sm border-t">
                      <div>{booking.id.toUpperCase()}</div>
                      <div>{format(new Date(booking.requestedAt), 'MMM dd, yyyy')}</div>
                      <div className="capitalize">{booking.status.replace('_', ' ')}</div>
                      <div className="capitalize">{booking.urgency}</div>
                      <div>${booking.estimatedCost?.toLocaleString() || 'N/A'}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aircraft" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Aircraft Utilization</CardTitle>
                <CardDescription>View fleet availability and usage statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAircraft.map(aircraft => {
                    const assignments = mockBookings.filter(b => b.aircraftId === aircraft.id).length;
                    const utilizationRate = (assignments / totalBookings) * 100;
                    
                    return (
                      <div key={aircraft.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <Plane className="h-4 w-4 text-muted-foreground" />
                              <h4 className="font-semibold">{aircraft.type}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">{aircraft.registration}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{assignments}</p>
                            <p className="text-xs text-muted-foreground">flights</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Utilization Rate</span>
                            <span className="font-medium">{utilizationRate.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary rounded-full h-2 transition-all"
                              style={{ width: `${utilizationRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Invoices</CardTitle>
                <CardDescription>Manage invoices and payment records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <div className="p-4 bg-muted font-semibold grid grid-cols-5 text-sm">
                    <div>Invoice #</div>
                    <div>Date</div>
                    <div>Booking ID</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  {mockBookings.filter(b => b.estimatedCost).map(booking => (
                    <div key={booking.id} className="p-4 grid grid-cols-5 text-sm border-t">
                      <div>INV-{booking.id.toUpperCase()}</div>
                      <div>{format(new Date(booking.requestedAt), 'MMM dd, yyyy')}</div>
                      <div>{booking.id.toUpperCase()}</div>
                      <div className="font-semibold">${booking.estimatedCost?.toLocaleString()}</div>
                      <div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          booking.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status === 'completed' ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sla" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SLA Compliance Report</CardTitle>
                <CardDescription>Service level agreement performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-lg p-4">
                    <div className="text-center">
                      <BarChart className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-2xl font-bold text-green-600">98.5%</p>
                      <p className="text-sm text-muted-foreground">On-Time Departures</p>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-center">
                      <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-2xl font-bold text-blue-600">15 min</p>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-2xl font-bold text-green-600">100%</p>
                      <p className="text-sm text-muted-foreground">Safety Compliance</p>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">SLA Targets:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Emergency response within 30 minutes: ✓ Met</li>
                    <li>Clinical review within 2 hours: ✓ Met</li>
                    <li>Aircraft assignment within 4 hours: ✓ Met</li>
                    <li>Handover documentation within 24 hours: ✓ Met</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
