'use client'
import { useSupabase } from "@/app/demo/layout"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react';


export function AddGoal() {

  const supabase = useSupabase();
  const [selectedImage, setSelectedImage] = useState("/goals/australia.jpg");
  const [pocketName, setPocketName] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState<number>();  
  const [monthlyContribution, setMonthlyContribution] = useState<number>();

  const handleImageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedImage(event.target.value);
  };
    
    const handleAddGoal = () => {
        if (pocketName && description && targetAmount && monthlyContribution) {
            const newGoal = {
                user_id: 2024001,
                title: pocketName,
                description: description,
                target_amount: targetAmount,
                monthly_contribution: monthlyContribution,
                image_url: selectedImage,
            };

            supabase
                .from('goals')
                .insert([newGoal])
                .then(({ error }) => {
                    if (error) {
                        console.error('Error inserting new goal:', error);
                        alert('Failed to add new goal. Please try again.');
                    } else {
                        console.log('New goal added successfully');
                    }
                });

            // Navigate to /demo/goals
            window.location.href = "/demo/goals";
        } else {
            alert("Please fill in all fields.");
        }
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='font-bold'>+ New Goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle >Add New Goal</DialogTitle>
          <DialogDescription>
            Add a new goal and start saving! Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">

          <div className="flex flex-col items-center gap-4 ">
              <img src={selectedImage} alt="Selected Goal" className="rounded-lg object-contain" height={100} width={480}/>
              <select id="image" onChange={handleImageChange} value={selectedImage} className="w-full border border-muted-foreground rounded-lg p-2">
                  <option value="/goals/australia.jpg">Trip</option>
                  <option value="/goals/house.jpg">House</option>
                  <option value="/goals/tesla.jpg">Car</option>
                  <option value="/goals/goals.jpg">Goals</option>
              </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Pocket Name
            </Label>
            <Input 
              id="name" 
              value={pocketName} 
              onChange={(e) => setPocketName(e.target.value)} 
              className="col-span-3" 
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="col-span-3" 
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="targetAmount" className="text-right">
              Target Amount
            </Label>
            <Input 
              id="targetAmount" 
              type="number" 
              value={targetAmount} 
              onChange={(e) => setTargetAmount(Number(e.target.value))} 
              className="col-span-3" 
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="monthlyContribution" className="text-right">
              Contribution / Month
            </Label>
            <Input 
              id="monthlyContribution" 
              type="number" 
              value={monthlyContribution} 
              onChange={(e) => setMonthlyContribution(Number(e.target.value))} 
              className="col-span-3" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddGoal}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
