Looking at the problem, I need to develop an algorithm to select seed influencers that maximize the total market value reachable within a given budget and influence depth. Here's my solution:

cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <tuple>
#include <algorithm>
#include <functional>

using namespace std;

// Function to calculate the reachable value from a set of seeds
pair<int, unordered_set<int>> calculateReach(
    const vector<vector<int>>& graph,
    const unordered_map<int, int>& values,
    const vector<int>& seeds,
    int depth) {
    
    unordered_set<int> visited;
    queue<pair<int, int>> q; // {node, current_depth}
    
    // Add all seeds to the queue
    for (int seed : seeds) {
        q.push({seed, 0});
        visited.insert(seed);
    }
    
    int total_value = 0;
    
    while (!q.empty()) {
        auto [current, current_depth] = q.front();
        q.pop();
        
        // Add value of current node
        if (values.find(current) != values.end()) {
            total_value += values.at(current);
        }
        
        // If we haven't reached maximum depth, explore neighbors
        if (current_depth < depth) {
            for (int neighbor : graph[current]) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    q.push({neighbor, current_depth + 1});
                }
            }
        }
    }
    
    return {total_value, visited};
}

tuple<vector<int>, int, int> solveCampaign(
    const vector<pair<int, int>>& connections,
    const unordered_map<int, int>& costs,
    const unordered_map<int, int>& values,
    int budget, int depth) {
    
    // Build adjacency list graph
    int max_node = 0;
    for (const auto& conn : connections) {
        max_node = max(max_node, max(conn.first, conn.second));
    }
    
    vector<vector<int>> graph(max_node + 1);
    for (const auto& conn : connections) {
        graph[conn.first].push_back(conn.second);
        graph[conn.second].push_back(conn.first);
    }
    
    // Get all potential seeds (users with cost information)
    vector<int> potential_seeds;
    for (const auto& cost_pair : costs) {
        potential_seeds.push_back(cost_pair.first);
    }
    
    // Greedy algorithm with value-to-cost ratio
    vector<int> selected_seeds;
    int total_cost = 0;
    int total_value = 0;
    unordered_set<int> current_reach;
    
    while (true) {
        double best_ratio = -1.0;
        int best_seed = -1;
        int best_additional_value = 0;
        int best_seed_cost = 0;
        
        // Find the seed with best value-to-cost ratio that fits budget
        for (int seed : potential_seeds) {
            if (costs.at(seed) + total_cost > budget) {
                continue; // Skip if over budget
            }
            
            if (find(selected_seeds.begin(), selected_seeds.end(), seed) != selected_seeds.end()) {
                continue; // Skip if already selected
            }
            
            // Calculate additional value from this seed
            vector<int> test_seeds = selected_seeds;
            test_seeds.push_back(seed);
            auto [test_value, test_reach] = calculateReach(graph, values, test_seeds, depth);
            
            int additional_value = test_value - total_value;
            double ratio = (additional_value > 0) ? static_cast<double>(additional_value) / costs.at(seed) : 0.0;
            
            if (ratio > best_ratio) {
                best_ratio = ratio;
                best_seed = seed;
                best_additional_value = additional_value;
                best_seed_cost = costs.at(seed);
            }
        }
        
        if (best_seed == -1) {
            break; // No more seeds can be added within budget
        }
        
        // Add the best seed to selection
        selected_seeds.push_back(best_seed);
        total_cost += best_seed_cost;
        total_value += best_additional_value;
        
        // Update current reach
        auto [new_value, new_reach] = calculateReach(graph, values, selected_seeds, depth);
        current_reach = new_reach;
    }
    
    return {selected_seeds, total_value, total_cost};
}

// Helper function to read input (implementation depends on input format)
// This would be implemented based on how the input is provided

int main() {
    // Example usage (you would replace this with actual input reading)
    vector<pair<int, int>> connections = {{1, 2}, {1, 3}, {4, 5}};
    unordered_map<int, int> costs = {{1, 50}, {4, 60}};
    unordered_map<int, int> values = {{1, 10}, {2, 20}, {3, 30}, {4, 5}, {5, 5}};
    int budget = 100;
    int depth = 1;
    
    auto result = solveCampaign(connections, costs, values, budget, depth);
    
    vector<int> selected_seeds = get<0>(result);
    int total_value = get<1>(result);
    int total_cost = get<2>(result);
    
    // Output the results
    cout << "Selected seeds: ";
    for (int i = 0; i < selected_seeds.size(); i++) {
        if (i > 0) cout << ", ";
        cout << selected_seeds[i];
    }
    cout << endl;
    cout << "Total value: " << total_value << endl;
    cout << "Total cost: " << total_cost << endl;
    
    return 0;
}


Key Features of the Solution:

1. Graph Construction: Builds an adjacency list from the given connections.
2. Reach Calculation: Uses BFS to calculate all nodes reachable within the specified depth from given seeds.
3. Greedy Selection: Employs a greedy algorithm that selects seeds based on the best value-to-cost ratio of the additional reach they provide.
4. Budget Constraint: Ensures the total cost doesn't exceed the given budget.
5. Efficiency: Avoids brute-force by using a greedy heuristic that's much more computationally feasible.

The algorithm works by iteratively selecting the seed that provides the best "bang for the buck" (highest additional value per cost unit) while staying within budget constraints. This approach provides a good balance between solution quality and computational efficiency.