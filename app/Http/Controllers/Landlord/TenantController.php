<?php

namespace App\Http\Controllers\Landlord;

use App\Http\Controllers\Controller;
use App\Models\Landlord\Tenant;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::all();

        return response()->jsonResponse(
            'Tenants retrieved successfully.',
            $tenants,
            200
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:tenants',
            'domain' => 'required|string|max:255|unique:tenants',
        ]);

        $tenant = Tenant::create($request->all());

        return response()->jsonResponse(
            'Tenant created successfully.',
            $tenant,
            201
        );
    }

    public function show(Tenant $tenant)
    {
        //
    }

    public function update(Request $request, Tenant $tenant)
    {
        //
    }
}
