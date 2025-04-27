<?php

namespace App\Landlord;

use App\Models\Landlord\Tenant;
use Illuminate\Http\Request;
use Spatie\Multitenancy\Contracts\IsTenant;
use Spatie\Multitenancy\TenantFinder\TenantFinder;

class HeaderTenantFinder extends TenantFinder
{
    protected string $headerName = 'X-Tenant-ID';
    
    public function findForRequest(Request $request): ?IsTenant
    {
        $tenantIdOrSlug = $request->header($this->headerName);

        if (!$tenantIdOrSlug) {
            return null;
        }

        return $this->findTenantById($tenantIdOrSlug);
    }

    protected function findTenantById($tenantIdOrSlug): ?IsTenant
    {
        $tenant = Tenant::idOrSlug($tenantIdOrSlug)->first();

        if (!$tenant) {
            return null;
        }

        return $tenant;
    }
}
